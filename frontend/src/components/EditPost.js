/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import uuid from 'uuid/v1'
import moment from 'moment'
import PostDetail from './PostDetail'
import * as Api from '../utils/api'
import {updatePost} from '../actions'

class EditPost extends Component {
    state = {
        editMode: false,
        post: {
            title: "",
            body: "",
            author: ""
        }
    }
    handleSave(e) {
        const {post, history, updatePostAction} = this.props;
        const newPost = {...post, ...this.state.post};
        const opPromise = this.state.editMode ?
            Api.updatePost(newPost) : Api.createPost(newPost);
        opPromise.then(data => {
            updatePostAction(data);
            history.goBack();
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
        const newState = {
            editMode: nextProps.post ? true : false
        };
        if (nextProps.post) {
            const {title, body, author} = nextProps.post;
            newState.post = {title, body, author};
        }
        this.setState(newState);
    }

    render() {
        const {history, category} = this.props;
        const {editMode} = this.state;
        return (
            <div>
                <div>
                    <h4 className="inline-block">{`${editMode ? 'Edit' : 'New'} ${category.name} Post`}</h4>
                    <div className="pull-right">
                        <button className="btn btn-default" title="Go Back" onClick={e => {
                            e.preventDefault();
                            history.goBack();
                        }}>
                            <span className="glyphicon glyphicon-arrow-left"></span>
                            &nbsp;Back
                        </button>
                        <button className="btn btn-success" title="Save post" onClick={this.handleSave.bind(this)}>
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
                                   onChange={this.handleAuthorChanged.bind(this)}/>
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                               className="form-control"
                               id="title"
                               placeholder="Title"
                               value={this.state.post.title}
                               onChange={this.handleTitleChanged.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Post</label>
                        <textarea
                            rows="5"
                            className="form-control"
                            id="body"
                            placeholder="Text"
                            value={this.state.post.body}
                            onChange={this.handleBodyChanged.bind(this)}/>
                    </div>
                </form>
                <hr/>
                <PostDetail post={{...this.props.post, ...this.state.post}} readOnly={true}/>
            </div>
        )
    }
}

function mapStateToProps({posts, categories}, {location, match}) {
    const category = location.pathname.split('/')[1];
    const post = match.params && match.params.id && posts[category] ?
        posts[category][match.params.id] : {
            id: uuid(),
            timestamp: moment().toDate(),
            title: "",
            body: "",
            author: "",
            category: category,
            voteScore: 0
        };
    return {post, category: categories[category]}
}

function mapDispatchToProps(dispatch) {
    return {
        updatePostAction: (post) => updatePost(post)(dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPost))