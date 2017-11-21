/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {VoteScore} from './'
import * as Api from '../utils/api'

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment // move it to store
        }
        this.handleCommentVote.bind(this);
    }
    handleCommentVote(commentId, upVote) {
        Api.commentVote(commentId, upVote)
            .then(comment => {
                console.log(comment);
            })
    }
    render() {
        const {comment} = this.state
        const upVote = () => this.handleCommentVote(comment.id, true);
        const downVote = () => this.handleCommentVote(comment.id, false);
        return (
            <div className="panel panel-default">
                <div className="panel-heading center">
                    <div className="inline-block">
                        <span className="glyphicon glyphicon-comment extra-margin-lr"></span>
                        {comment.author}
                    </div>
                    <div className="pull-right">
                        <VoteScore voteScore={comment.voteScore} className="inline-block" upVote={upVote} downVote={downVote}/>
                    </div>
                </div>
                <div className="panel-body">
                    {comment.body}
                </div>
            </div>
        )
    }
}

export default Comment