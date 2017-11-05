/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import * as Api from "../utils/api"

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POSTS = 'ADD_POSTS'


export const fetchCategories = dispatch => (
    Api.fetchCategories()
        .then(data => {
            dispatch({
                type: ADD_CATEGORIES,
                categories: data.categories
            });
        })
);

export const fetchPosts = dispatch => (
    Api.fetchPosts()
        .then(posts => {
            dispatch({
                type: ADD_POSTS,
                posts
            })
        })
)