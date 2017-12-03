/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import uuid from 'uuid/v1'
import moment from 'moment'
import queryString from 'query-string'

import * as Api from '../utils/api'
import {parseRelativePathSegments} from '../utils/helpers'
import PostActions from './PostsActions'

class AddOrEditPost extends Component {
    constructor(props) {
        super(props);
        const {title = '', body = '', author = ''} = props.post || {};
        this.state = {
            post: {
                title, body, author
            }
        }
        this.handleSave.bind(this);
        this.handleAuthorChanged.bind(this);
        this.handleTitleChanged.bind(this);
        this.handleBodyChanged.bind(this);
    }

    handleSave(e) {
        const {post, updatePost, switchToViewMode, history} = this.props;
        const newPost = {...post, ...this.state.post};
        const opPromise = this.props.editMode ?
            Api.updatePost(newPost) : Api.createPost(newPost);
        opPromise.then(data => {
            updatePost(data);
            if (switchToViewMode) {
                switchToViewMode();
            } else {
                history.goBack();
            }
        })
    }
    handleAuthorChanged(e) {
        const {post} = this.state;
        post.author = e.target.value;
        this.setState({post});
    }

    handleTitleChanged(e) {
        const {post} = this.state;
        post.title = e.target.value;
        this.setState({post});
    }

    handleBodyChanged(e) {
        const {post} = this.state;
        post.body = e.target.value;
        this.setState({post});
    }

    componentWillReceiveProps(nextProps) {
        const newState = {};
        if (nextProps.post) {
            const {title, body, author} = nextProps.post;
            newState.post = {title, body, author};
        }
        this.setState(newState);
    }

    render() {
        const {history, category} = this.props;
        const {editMode, switchToViewMode} = this.props;
        return (
            <div>
                <div>
                    <h4 className="inline-block">{`${editMode ? 'Edit' : 'New'} ${category.name} Post`}</h4>
                    <div className="pull-right">
                        <button className="btn btn-default" title="Go Back" onClick={e => {
                            e.preventDefault();
                            // go back differs for new/edit action
                            if (switchToViewMode) {
                                switchToViewMode()
                            } else {
                                history.goBack();
                            }
                        }}>
                            <span className="glyphicon glyphicon-arrow-left"></span>
                            &nbsp;Back
                        </button>
                        <button className="btn btn-success" title="Save post" onClick={e => this.handleSave(e)}>
                            <span className="glyphicon glyphicon-ok"></span>
                            &nbsp;Save
                        </button>
                    </div>
                </div>
                <hr/>
                <form onSubmit={e => e.preventDefault()}>
                    {!editMode &&
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text"
                                   className="form-control"
                                   id="author"
                                   placeholder="Author"
                                   value={this.state.post.author}
                                   onChange={e => this.handleAuthorChanged(e)}/>
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                               className="form-control"
                               id="title"
                               placeholder="Title"
                               value={this.state.post.title}
                               onChange={e => this.handleTitleChanged(e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Post</label>
                        <textarea
                            rows="5"
                            className="form-control"
                            id="body"
                            placeholder="Text"
                            value={this.state.post.body}
                            onChange={e => this.handleBodyChanged(e)}/>
                    </div>
                </form>
                <hr/>
            </div>
        )
    }
}

function mapStateToProps({posts, categories}, {location, match}) {
    const category = parseRelativePathSegments(location.pathname)[0];
    const queryParams = queryString.parse(location.search);
    const editMode = queryParams.edit || queryParams.edit === null;
    const post = match.params && match.params.id && posts[category] ?
        posts[category][match.params.id] : {
            id: uuid(),
            timestamp: moment.now(),
            title: "",
            body: "",
            author: "",
            category: category,
            voteScore: 0
        };
    return {post, category: categories[category], editMode}
}

function mapDispatchToProps(dispatch) {
    return {
        ...PostActions(dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOrEditPost))