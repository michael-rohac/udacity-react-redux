/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as Api from '../utils/api'
import {updatePost} from '../actions'

class Voter extends Component {
    postVote(postId, upVote) {
        const {updatePostAction} = this.props;
        Api.postVote(postId, upVote)
            .then(data => {
                updatePostAction(data)
            })
    }
    render() {
        const {post} = this.props
        return (
            <div className="text-right">
                <span>
                    <b><em>Vote:</em></b>
                </span>
                <a href="" onClick={e => {
                    e.preventDefault();
                    this.postVote(post.id, false);
                }}>
                    <span className="glyphicon glyphicon-thumbs-down" style={{marginLeft: 5, marginRight: 5}}></span>
                </a>
                <a href="" onClick={e => {
                    e.preventDefault();
                    this.postVote(post.id, true);
                }}>
                    <span className="glyphicon glyphicon-thumbs-up" style={{marginLeft: 5, marginRight: 5}}></span>
                </a>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePostAction: (post) => updatePost(post)(dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Voter)
