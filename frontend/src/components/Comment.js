/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import moment from 'moment'
import * as Api from '../utils/api'
import {VoteScore, DropdownMenu} from './'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment // move it to store
        }
        this.handleCommentVote.bind(this);
    }
    handleCommentVote(commentId, upVote) {
        const {handleCommentUpdate} = this.props;
        Api.commentVote(commentId, upVote)
            .then(comment => {
                this.setState({comment})
                handleCommentUpdate && handleCommentUpdate(comment);
            })
    }
    handleDeleteComment() {
        const {handleCommentUpdate} = this.props;
        const {comment} = this.state;
        Api.deletePostComment(comment.id)
            .then(comment => {
                handleCommentUpdate && handleCommentUpdate(comment);
            })
    }
    render() {
        const {comment} = this.state
        const upVote = () => this.handleCommentVote && this.handleCommentVote(comment.id, true);
        const downVote = () => this.handleCommentVote && this.handleCommentVote(comment.id, false);
        const menu = {
            dropdownToggleIcon: 'glyphicon glyphicon-comment',
            menuItems:  [
                {
                    id: 'edit',
                    displayName: 'Edit',
                    iconClass: 'glyphicon glyphicon-pencil',
                    // action:
                }, {
                    id: 'delete',
                    displayName: 'Delete',
                    iconClass: 'glyphicon glyphicon-remove',
                    action: this.handleDeleteComment.bind(this)
                }
            ]
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading center">
                    <div className="inline-block">
                        <DropdownMenu menu={menu}/>
                        Auhtor: {comment.author}
                    </div>
                    <div className="pull-right">
                        <span>{moment(comment.timestamp).format('MMMM Do YYYY, h:mm A')}</span>
                    </div>
                </div>
                <div className="panel-body">
                    {comment.body}
                </div>
                <div className="panel-footer">
                    <VoteScore voteScore={comment.voteScore} className="inline-block" upVote={upVote} downVote={downVote}/>
                </div>
            </div>
        )
    }
}

export default Comment