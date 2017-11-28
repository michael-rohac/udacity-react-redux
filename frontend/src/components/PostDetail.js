/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import uuid from 'uuid/v1'
import moment from 'moment'
import {updatePost} from '../actions'

import * as Api from '../utils/api'
import {CommentList, Comment, VoteScore, DropdownMenu} from './'

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
        const {post} = this.props;
        if (!post) return;

        Api.fetchPostComments(post.id)
            .then(comments => {
                this.setState({comments})
            })
    }

    handlePostVote(postId, upVote) {
        const {updatePostAction} = this.props;
        Api.postVote(postId, upVote)
            .then(post => {
                updatePostAction(post)
            })
    }

    handleDeletePost() {
        const {post, updatePostAction} = this.props;
        Api.deletePost(post.id)
            .then(data => updatePostAction(data))
    }

    addComment(e) {
        e.preventDefault();
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
        const {post, readOnly, history} = this.props;
        const {comments, addComment} = this.state;
        const upVote = readOnly ? undefined : () => this.handlePostVote(post.id, true);
        const downVote = readOnly ? undefined : () => this.handlePostVote(post.id, false);

        const viewLocation = `/${post.category}`
        const menu = {
            menuItems: [
                {
                    id: 'edit',
                    displayName: 'Edit',
                    iconClass: 'glyphicon glyphicon-pencil',
                    action: () => history.push(`${viewLocation}/posts/${post.id}`)
                }, {
                    id: 'delete',
                    displayName: 'Delete',
                    iconClass: 'glyphicon glyphicon-remove',
                    action: this.handleDeletePost.bind(this)
                }
            ]
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div>
                        {!readOnly && <DropdownMenu menu={menu}/>}
                        <h3 className="panel-title inline-block">{post.title}</h3>
                        <div
                            className="text-right pull-right">{moment(post.timestamp).format('MMMM Do YYYY, h:mm A')}</div>
                    </div>
                </div>
                <div className="panel-body">
                    {post.body && post.body.split("\n").map((text, idx) => text ? (<p key={idx}>{text}</p>) : (<br key={idx}/>))}
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
                                <div style={{marginBottom: 10}}>
                                    <em>
                                        {comments.length > 0 ? `Contains ${comments.length} comment(s):` : 'No comments yet:'}
                                        <a href="" className="btn" onClick={this.addComment.bind(this)}>
                                            <span className="glyphicon glyphicon-plus"></span>
                                            &nbsp;Add
                                        </a>
                                    </em>
                                </div>
                                <CommentList comments={comments}/>
                            </div>
                        )
                    }
                </div>
                <div className="panel-footer">
                    <div className="inline-block">
                        <span>Author: {post.author}</span>
                    </div>
                    <div className="pull-right">
                        <VoteScore voteScore={post.voteScore} className="inline-block" upVote={upVote} downVote={downVote}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePostAction: (post) => updatePost(post)(dispatch)
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PostDetail));
