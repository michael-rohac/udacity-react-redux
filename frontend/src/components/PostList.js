/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PostDetail from './PostDetail'
import {CONST, dateCompare} from '../utils/helpers'

class PostList extends Component {
    render() {
        const {uiSettings} = this.props;
        let {order} = uiSettings.posts;
        const posts = (this.props.posts).sort((post1, post2) => {
            const ascResult = order.by === CONST.ORDER_BY_TIMESTAMP ?
                dateCompare(post1.timestamp, post2.timestamp) : post1.voteScore - post2.voteScore;
            return order.ascending ? ascResult : -ascResult;
        })

        return (
            <div>
                {posts.map(post => (
                    <PostDetail key={post.id} post={post}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps({categories, posts, uiSettings}, {match}) {
    const pathSegments = match.url.split('/');
    const category = pathSegments.length < 2 || !pathSegments[1] ? null : pathSegments[1];
    let allPosts;
    if (posts && !category) {
        allPosts = Object.keys(posts).reduce((acc, category) => {
            return acc.concat(Object.keys(posts[category]).map(postId => posts[category][postId]));
        }, [])
    } else if (posts && category && posts[category]) {
        allPosts = Object.keys(posts[category]).map(postId => posts[category][postId]);
    } else {
        allPosts = [];
    }
    return {
        category: categories[category],
        posts: allPosts,
        uiSettings
    }
}

export default withRouter(connect(mapStateToProps)(PostList))