/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import * as Api from "../utils/api"
import {ADD_POSTS, UPDATE_POST} from "./PostsReducer"

export const fetchPosts = () => dispatch => (
    Api.fetchPosts()
        .then(posts => {
            dispatch({
                type: ADD_POSTS,
                posts
            })
        })
)

export const updatePost = post => dispatch => (
    dispatch({
        type: UPDATE_POST,
        post
    })
)
