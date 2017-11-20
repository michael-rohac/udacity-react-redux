/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {combineReducers} from 'redux'
import {ADD_CATEGORIES, ADD_POSTS, UPDATE_POST} from "../actions"
import {UPDATE_UI_SETTINGS} from "../actions/index";
import {capitalize} from '../utils/helpers'

function posts(state = {}, action) {
    switch (action.type) {
        case ADD_POSTS:
            const {posts} = action
            return posts.reduce((acc, post) => {
                if (!acc[post.category]) acc[post.category] = {};
                acc[post.category][post.id] = post;
                return acc;
            }, {})
        case UPDATE_POST:
            const {post} = action
            const ret = {
                ...state,
                [post.category]: {
                    ...state[post.category],
                    [post.id]: post
                }
            }
            return ret;
        default:
            return state
    }
}

function categories(state = {}, action) {
    switch (action.type) {
        case ADD_CATEGORIES:
            const {categories} = action
            return {
                ...state,
                ...categories.reduce((acc, category) => {
                    acc[category.path] = {
                        ...category, name: capitalize(category.name)
                    }
                    return acc
                }, {})
            }
        default:
            return state
    }
}

function uiSettings(state = {
    postsOrder: {
        by: 'voteScore',
        ascending: false
    }
}, action) {
    switch (action.type) {
        case UPDATE_UI_SETTINGS:
            const {uiSettings} = action;
            return {
                ...state, ...uiSettings
            }
        default:
            return state
    }
}

export default combineReducers({
    uiSettings, categories, posts
})