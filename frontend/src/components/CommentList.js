/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Comment} from './'

function _sort(comments) {
    return comments.filter(c => !c.deleted).sort((c1, c2) => c2.voteScore - c1.voteScore)
}

class CommentList extends Component {
    constructor(props) {
        super(props);
        const {comments} = props;
        this.state = {
            comments: !comments ? [] : _sort(comments)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            comments: _sort(nextProps.comments)
        })
    }

    render() {
        const {comments} = this.state;
        const {switchToAddComment, commentUpdate} = this.props;
        return (
            <div>
                <div style={{marginBottom: 10}}>
                    <em>
                        {comments.length > 0 ? `Contains ${comments.length} comment(s):` : 'No comments yet:'}
                        <a href="" className="btn" onClick={e => {
                            e.preventDefault()
                            switchToAddComment()}
                        }>
                            <span className="glyphicon glyphicon-plus"></span>
                            &nbsp;Add
                        </a>
                    </em>
                </div>
                {comments.map(comment => (<Comment key={comment.id} comment={comment} handleCommentUpdate={commentUpdate}/>))}
            </div>
        )
    }
}

export default CommentList