/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import Post from './Post'
import {CONST} from '../utils/helpers'

class PostList extends Component {
    render() {
        const {uiSettings} = this.props;
        let {order} = uiSettings.posts;
        const posts = this.props.posts.sort((post1, post2) => {
            const ascResult = order.by === CONST.ORDER_BY_TIMESTAMP ?
                post1.timestamp - post2.timestamp : post1.voteScore - post2.voteScore;
            return order.ascending ? ascResult : -ascResult;
        })

        return (
            <div>
                {posts.map(post => (
                    <Post key={post.id} post={post}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps({posts, uiSettings}, {location}) {
    const categoryPath = location.pathname.substring(1);
    return {
        uiSettings,
        posts: !posts[categoryPath] ? [] : Object.keys(posts[categoryPath]).map(postId => posts[categoryPath][postId])
    }
}

export default connect(mapStateToProps)(PostList)