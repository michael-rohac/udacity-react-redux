/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import {updatePost} from '../actions'

import * as Api from '../utils/api'
import {CommentList, VoteScore} from './'

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.handlePostVote.bind(this);
    }
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
            .then(data => {
                updatePostAction(data)
            })
    }
    render() {
        const {post, readOnly} = this.props;
        const {comments} = this.state;
        const upVote = readOnly ? undefined : () => this.handlePostVote(post.id, true);
        const downVote = readOnly ? undefined : () => this.handlePostVote(post.id, false);
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
