import React, {Component} from 'react';
import '../styles/App.css';

import {connect} from 'react-redux'
import {fetchCategories} from "../actions";

class App extends Component {
    state = {
        initialized: false
    }
    componentDidMount() {
        // issue API call only for very first application visit
        if (this.state.initialized) return;
        this.setState({initialized: true});
        this.props.fetchCategories();
    }
    render() {
        const {categories} = this.props;
        return (
            <div className="App">
                <header>
                    <h1 className="text-center">Readable Application</h1>
                </header>
                <ul>
                    {categories.map((category) => (
                        <li key={category.path}>{category.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

function mapStateToProps ({categories}) {
    return {
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchCategories: () => fetchCategories(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)