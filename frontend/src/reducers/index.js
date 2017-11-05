/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {combineReducers} from 'redux'
import {ADD_CATEGORIES, ADD_POSTS} from "../actions"

const initialState = {
    categories: [],
    posts: {}
}

function categories(state = [], action) {
    const {categories} = action;
    switch (action.type) {
        case ADD_CATEGORIES:
            const ret = {
                ...state,
                categories
            }
            return ret
        default:
            return state;
    }
}

function posts(state = {}, action) {
    const {posts} = action;
    switch (action.type) {
        case ADD_POSTS:
            const ret = {
                ...state,
                posts: posts
            }
            return ret
        default:
            return state
    }
}

export default combineReducers({
    categories, posts
})