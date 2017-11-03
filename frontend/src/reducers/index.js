/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */

import {ADD_CATEGORIES} from "../actions"

const initialState = {
    categories: []
}

function categories(state = initialState, action) {
    const {categories} = action;
    switch (action.type) {
        case ADD_CATEGORIES:
            return {
                ...state,
                categories: categories
            }
        default:
            return state;
    }
}

export default categories
