/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Comment} from './'

function _sort(comments) {
    return comments.sort((c1, c2) => c2.voteScore - c1.voteScore)
}

class CommentList extends Component {
    constructor(props) {
        super(props);
        const {comments} = props;

        this.handleCommentUpdate.bind(this);
        this.state = {
            comments: !comments ? [] : _sort(comments)
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            comments: _sort(nextProps.comments)
        })
    }
    handleCommentUpdate(comment) {
        const {comments} = this.state
        this.setState({
            comments: _sort(comments.map(c => c.id !== comment.id ? c : comment))
        })
    }
    render() {
        const {comments} = this.state;
        return (
            <div>
                <hr/>
                <div style={{marginBottom: 10}}>
                    <em>Comments:</em>
                </div>
                {comments.map(comment => (<Comment key={comment.id} comment={comment} handleCommentUpdate={this.handleCommentUpdate.bind(this)}/>))}
            </div>
        )
    }
}

export default CommentList