/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const fetchCategories = () =>
    fetch(`${api}/categories`, {headers})
        .then(res => res.json())

export const fetchPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then(res => res.json())

export const fetchCategoryPosts = (categoryName) =>
    fetch(`${api}/${categoryName}/posts`, {headers}).then(res => res.json())