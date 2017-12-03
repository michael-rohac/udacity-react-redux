/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import * as Api from "../utils/api"
import {ADD_POSTS, UPDATE_POST} from "./PostsReducer"

const fetchPosts = dispatch => (
    Api.fetchPosts()
        .then(posts => {
            dispatch({
                type: ADD_POSTS,
                posts
            })
        })
)

const updatePost = (post, dispatch) => (
    dispatch({
        type: UPDATE_POST,
        post
    })
)

export default (dispatch) => {
    return {
        fetchPosts: () => fetchPosts(dispatch),
        updatePost: (post) => updatePost(post, dispatch)
    }
}
