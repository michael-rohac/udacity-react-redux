import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {combineReducers, createStore} from 'redux'
import {Provider} from 'react-redux'

import {categories} from './categories/CategoriesReducer'
import {posts} from './posts/PostsReducer'
import {uiSettings} from './uiSettings/UiSettingsReducer'


import registerServiceWorker from './registerServiceWorker'

import App from './app/App'

const reducer = combineReducers({categories, posts, uiSettings})

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),

)

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root')
)
registerServiceWorker()
