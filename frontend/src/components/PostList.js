/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {CONST, dateCompare} from '../utils/helpers'

import {PostDetail} from './'

class PostList extends Component {
    render() {
        let {postsOrder} = this.props;
        const posts = (this.props.posts).sort((post1, post2) => {
            const ascResult = postsOrder.by === CONST.ORDER_BY_TIMESTAMP ?
                dateCompare(post1.timestamp, post2.timestamp) : post1.voteScore - post2.voteScore;
            return postsOrder.ascending ? ascResult : -ascResult;
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
        postsOrder: uiSettings.postsOrder
    }
}

export default withRouter(connect(mapStateToProps)(PostList))