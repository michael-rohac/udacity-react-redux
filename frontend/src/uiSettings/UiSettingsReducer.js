/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
export const UPDATE_UI_SETTINGS = 'UPDATE_UI_SETTINGS'

export function uiSettings(state = {
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
