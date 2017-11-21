/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'

import * as Api from '../utils/api'
import {VoteScore, Voter, CommentList} from './'

class PostDetail extends Component {
    state = {
        comments: []
    }
    redirect(event, url) {
        const {history} = this.props;
        event.preventDefault();
            history.push(url);
        // history.push(url);
    }
    componentDidMount() {
        const {post, readOnly} = this.props;
        if (!post) return;

        Api.fetchPostComments(post.id)
            .then(comments => {
                this.setState({comments})
            })
    }
    render() {
        const {post, readOnly} = this.props;
        const {comments} = this.state;
        const viewLocation = `/${post.category}`
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div>
                        {!readOnly && <Link to={`${viewLocation}/posts/${post.id}`} className="extra-margin-lr">
                            <span className="glyphicon glyphicon-pencil"></span>
                        </Link>

                        }

                        <h3 className="panel-title inline-block">{post.title}</h3>
                        <div className="text-right pull-right">{moment(post.timestamp).format('MMMM Do YYYY, h:mm A')}</div>
                    </div>
                </div>
                <div className="panel-body">
                    {post.body && post.body.split("\n").map((text, idx) => (
                        <p key={idx}>{text}</p>
                    ))}
                    <CommentList comments={comments}/>
                </div>
                <div className="panel-footer">
                    <div className="inline-block">
                        <VoteScore voteScore={post.voteScore} className="inline-block"/>
                        <span>Author: {post.author}</span>
                    </div>
                    <div className="pull-right">
                        {!readOnly && (
                            <Voter post={post} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(PostDetail));
