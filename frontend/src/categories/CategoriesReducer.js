/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {capitalize} from '../utils/helpers'

export const ADD_CATEGORIES = 'ADD_CATEGORIES'

export function categories(state = {}, action) {
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
