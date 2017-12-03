/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import uuid from 'uuid/v1'
import moment from 'moment'
import * as PostActions from './PostsActions'

import * as Api from '../utils/api'
import {parseRelativePathSegments} from "../utils/helpers";

import {Comment, CommentList, DropdownMenu, VoteScore} from '../app/index'

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.handlePostVote.bind(this);
    }

    state = {
        addComment: false,
        comments: []
    }

    componentDidMount() {
        const {post, singlePostView, history} = this.props;
        if (!post) return;
        if (singlePostView && !post.id) {
            history.replace("/")
            return;
        }

        Api.fetchPostComments(post.id)
            .then(comments => {
                this.setState({comments})
            })
    }

    handlePostVote(postId, upVote) {
        const {updatePost} = this.props;
        Api.postVote(postId, upVote)
            .then(post => {
                updatePost(post)
            })
    }

    handleDeletePost() {
        const {post, updatePost, singlePostView, history} = this.props;
        Api.deletePost(post.id)
            .then(data => {
                updatePost(data)
                if (singlePostView) history.replace(`/${post.category}`)
            })
    }

    handleCommentUpdate(comment) {
        const {comments} = this.state
        this.setState({
            comments: comments.map(c => c.id !== comment.id ? c : comment)
        })
    }

    handleSwitchToAddComment(e) {
        this.setState({addComment: true})
    }

    handleCancelComment() {
        this.setState({addComment: false})
    }

    handleAddComment(newComment) {
        if (!newComment) {
            this.setState({addComment: false})
            return
        }
        const {comments} = this.state
        Api.createComment(newComment)
            .then(comment => {
                comments.push(comment)
                this.setState({addComment: false})
            })
    }

    render() {
        const {category, post, singlePostView, readOnly, history} = this.props;
        const {comments, addComment} = this.state;
        const upVote = readOnly ? undefined : () => this.handlePostVote(post.id, true);
        const downVote = readOnly ? undefined : () => this.handlePostVote(post.id, false);
        const menu = {
            menuItems: [
                {
                    id: 'edit',
                    displayName: 'Edit',
                    iconClass: 'glyphicon glyphicon-pencil',
                    action: () => history.push(`/${category}/${post.id}?edit`)
                }, {
                    id: 'delete',
                    displayName: 'Delete',
                    iconClass: 'glyphicon glyphicon-remove',
                    action: this.handleDeletePost.bind(this)
                }
            ]
        }
        return (
            <div>
                {singlePostView && (
                    <div>
                        <button className="btn btn-default" title="Go Back" onClick={e => history.goBack()}>
                            <span className="glyphicon glyphicon-arrow-left"></span>
                            &nbsp;Go Back
                        </button>
                        <hr/>
                    </div>
                )}
                <div className="panel panel-default">
                        <div className="panel-heading">
                            <div>
                                {!readOnly && <DropdownMenu menu={menu}/>}
                                <h3 className="panel-title inline-block">
                                    <a href="" onClick={e => {
                                        e.preventDefault();
                                        if (!singlePostView) history.push(`/${category}/${post.id}`);
                                    }}>{post.title}</a>
                                </h3>
                                <div
                                    className="text-right pull-right">{moment(post.timestamp).format('MMMM Do YYYY, h:mm A')}</div>
                            </div>
                        </div>
                        <div className="panel-body">
                            {post.body && post.body.split("\n").map((text, idx) => text ? (<p key={idx}>{text}</p>) : (
                                <br key={idx}/>))}
                            {
                                (addComment && <Comment comment={{
                                        id: uuid(),
                                        timestamp: moment.now(),
                                        body: "",
                                        author: "",
                                        parentId: post.id
                                    }} handleAddComment={this.handleAddComment.bind(this)} handleCancelComment={this.handleCancelComment.bind(this)}/>
                                ) ||
                                (
                                    <div>
                                        <hr/>
                                        <CommentList comments={comments}
                                                     commentUpdate={this.handleCommentUpdate.bind(this)}
                                                     switchToAddComment={this.handleSwitchToAddComment.bind(this)}/>
                                    </div>
                                )
                            }
                        </div>
                        <div className="panel-footer">
                            <div className="inline-block">
                                <span>Author: {post.author}</span>
                            </div>
                            <div className="pull-right">
                                <VoteScore voteScore={post.voteScore} className="inline-block" upVote={upVote}
                                           downVote={downVote}/>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps({posts}, {location, match, post}) {
    const category = post && post.category ? post.category : parseRelativePathSegments(location.pathname)[0];
    const singlePostView = match.params && match.params.id ? true : false;
    return {
        category,
        singlePostView,
        post: post ? post : (singlePostView && posts[category] ? posts[category][match.params.id] : {})
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(PostActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));
