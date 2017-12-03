import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {categories} from './categories/CategoriesReducer'
import {posts} from './posts/PostsReducer'
import {uiSettings} from './uiSettings/UiSettingsReducer'


import registerServiceWorker from './registerServiceWorker'

import App from './app/App'

const reducer = combineReducers({categories, posts, uiSettings})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
)
registerServiceWorker()
