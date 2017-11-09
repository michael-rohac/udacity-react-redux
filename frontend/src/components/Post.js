/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'

import VoteScore from './VoteScore'
import Voter from './Voter'

class Post extends Component {
    render() {
        const {post} = this.props;
        const viewLocation = `/${post.category}`
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div>
                        <Link to={`${viewLocation}/posts/${post.id}`} className="extra-margin-lr">
                            <span className="glyphicon glyphicon-pencil"></span>
                        </Link>
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
                    <div className="inline-block">
                        <VoteScore voteScore={post.voteScore} className="inline-block"/>
                        <span>Author: {post.author}</span>
                    </div>
                    <div className="pull-right">
                        <Voter post={post} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;
