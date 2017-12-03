/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
export const ADD_POSTS = 'ADD_POSTS'
export const UPDATE_POST = 'UPDATE_POST'

export function posts(state = {}, action) {
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
            return {
                ...state,
                [post.category]: {
                    ...state[post.category],
                    [post.id]: post
                }
            }
        default:
            return state
    }
}
