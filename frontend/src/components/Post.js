/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import moment from 'moment'

import VoteScore from './VoteScore'
import Voter from './Voter'

class Post extends Component {
    render() {
        const {post} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div>
                        <VoteScore voteScore={post.voteScore}/>
                        <h3 className="panel-title inline-block">{post.title}</h3>
                        <div className="text-right pull-right">{moment(post.timestamp).format('MMMM Do YYYY, h:mm A')}</div>
                    </div>
                </div>
                <div className="panel-body">
                    {post.body && post.body.split("\n").map((text, idx) => (
                        <p key={idx}>{text}</p>
                    ))}
                </div>
                <div className="panel-footer">
                    <Voter post={post}/>
                </div>
            </div>
        )
    }
}

export default Post;
