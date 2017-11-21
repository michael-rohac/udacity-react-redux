/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';

import {Comment} from './'

class CommentList extends Component {
    render() {
        const {comments} = this.props;
        return (
            <div>
                <hr/>
                <div style={{marginBottom: 10}}>
                    <em>Comments:</em>
                </div>
                {comments.map(comment => (<Comment key={comment.id} comment={comment}/>))}
            </div>
        )
    }
}

export default CommentList