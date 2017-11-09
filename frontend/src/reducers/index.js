/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {combineReducers} from 'redux'
import {ADD_POSTS, UPDATE_POST} from "../actions"

function posts(state = [], action) {
    switch (action.type) {
        case ADD_POSTS:
            const {posts} = action
            return posts
        case UPDATE_POST:
            const {post} = action
            return state.map(currentPost => currentPost.id === post.id ? post : currentPost)
        default:
            return state
    }
}

export default combineReducers({
    posts
})