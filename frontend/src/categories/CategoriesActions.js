/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import {ADD_CATEGORIES} from './CategoriesReducer'
import * as Api from "../utils/api"

export const fetchCategories = () => (dispatch) => (
    Api.fetchCategories()
        .then(data => {
            dispatch({
                type: ADD_CATEGORIES,
                categories: data.categories
            });
        })
);
