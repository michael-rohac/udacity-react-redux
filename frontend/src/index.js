import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/index'

import registerServiceWorker from './registerServiceWorker'

import App from './components/App'

const store = createStore(
    reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
