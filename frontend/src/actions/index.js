/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import * as Api from "../utils/api"

export const ADD_CATEGORIES = 'ADD_CATEGORIES'


export const fetchCategories = dispatch => (
    Api.fetchCategories()
        .then(data => {
            dispatch({
                type: ADD_CATEGORIES,
                ...data
            });
        })
);