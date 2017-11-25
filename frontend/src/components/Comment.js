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
            comment: props.comment
        }
        this.handleCommentVote.bind(this);
        this.handleSaveComment.bind(this);
        this.handleChangedAuthor.bind(this);
        this.handleChangedBody.bind(this);
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
    handleEditComment() {
        this.setState({ editMode: true })
    }
    handleChangedAuthor(e) {
        const {comment} = this.state
        this.setState({comment: {
            ...comment, author: e.target.value
        }});
    }
    handleChangedBody(e) {
        const {comment} = this.state
        this.setState({comment: {
            ...comment, body: e.target.value
        }});
    }
    handleSaveComment() {
        const {comment} = this.state
        const {handleCommentUpdate} = this.props;
        Api.updateComment(comment.id, comment.body)
            .then(comment => {
                this.setState({comment, editMode: false})
                handleCommentUpdate && handleCommentUpdate(comment);
            })
    }
    handleCancel() {
        const {comment} = this.props
        this.setState({comment, editMode: false})
    }
    render() {
        const {comment, editMode = false} = this.state
        const {newComment = false} = this.props
        const upVote = () => this.handleCommentVote && this.handleCommentVote(comment.id, true);
        const downVote = () => this.handleCommentVote && this.handleCommentVote(comment.id, false);
        const menu = {
            dropdownToggleIcon: 'glyphicon glyphicon-comment',
            menuItems:  [
                {
                    id: 'edit',
                    displayName: 'Edit',
                    iconClass: 'glyphicon glyphicon-pencil',
                    action: this.handleEditComment.bind(this)
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
                    {newComment && (
                        <div className="inline-block form-inline">
                            <span className={menu.dropdownToggleIcon + ' extra-margin-lr'}></span>
                            <div className="form-group">
                                <label htmlFor="author">Author:&nbsp;</label>
                                <input type="text"
                                       className="form-control"
                                       id="author"
                                       placeholder="Author"
                                       value={comment.author}
                                       onChange={e => this.handleChangedAuthor(e)}/>
                            </div>
                        </div>
                    )}
                    {!newComment && (
                        <div className="inline-block" style={{height: 34}}>
                            {editMode && (<span className={menu.dropdownToggleIcon + ' extra-margin-lr'}></span>)}
                            {!editMode && (<DropdownMenu menu={menu}/>)}
                            Auhtor: {comment.author}
                        </div>
                    )}
                    {editMode && (
                        <div className="pull-right btn-group">
                            <button type="button" className="btn btn-default" onClick={e => this.handleCancel(e)}>
                                <span className="glyphicon glyphicon-remove"></span>
                                &nbsp;Cancel
                            </button>
                            <button type="button" className="btn btn-success" onClick={e => this.handleSaveComment(e)}>
                                <span className="glyphicon glyphicon-ok"></span>
                                &nbsp;Save
                            </button>
                        </div>
                    )}
                    {!editMode && (
                        <div className="pull-right">
                            <span>{moment(comment.timestamp).format('MMMM Do YYYY, h:mm A')}</span>
                        </div>
                    )}
                </div>
                <div className="panel-body">
                    {editMode && (
                        <div className="form-group">
                            <label htmlFor="body">Comment</label>
                            <textarea
                                rows="3"
                                className="form-control"
                                id="body"
                                placeholder="Text"
                                value={comment.body}
                                onChange={e => this.handleChangedBody(e)}/>
                        </div>
                    )}
                    {!editMode && comment.body.split("\n").map((text, idx) => text ? (<p key={idx}>{text}</p>) : (<br key={idx}/>))}
                </div>
                {!editMode && (
                    <div className="panel-footer">
                        <VoteScore voteScore={comment.voteScore} className="inline-block" upVote={upVote} downVote={downVote}/>
                    </div>
                )}
            </div>
        )
    }
}

export default Comment