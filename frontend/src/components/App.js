import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route, Link, withRouter} from 'react-router-dom'

import '../styles/App.css';

import {fetchCategories, fetchPosts} from "../actions"
import {capitalize} from '../utils/helpers'

import Category from './Category'

class App extends Component {
    state = {
        initialized: false
    }

    componentDidMount() {
        // issue API call only for very first application visit
        if (this.state.initialized) return;
        this.props.fetchCategories();
        this.props.fetchPosts();
        this.setState({initialized: true});
    }

    render() {
        const {categories} = this.props;
        return (
            <div className="App">
                <div className="page-header text-center">
                    <h1>Udacity Readable</h1>
                    <h1>
                        <small>Project demonstrating React & Redux in action</small>
                    </h1>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <Route path="/" render={() => (
                                <ul className="nav nav-pills nav-stacked">
                                    <h4>Available Topics:</h4>
                                    {categories.map((category) => (
                                        <li key={category.path}>
                                            <Link to={'/' + category.path}>{capitalize(category.name)}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}/>
                        </div>

                        <div className="col-lg-10 col-md-9 col-sm-6">
                        {categories.map(category => (
                            <Route key={category.path} path={'/' + category.path} render={() => (
                                    <Category name={category.name}/>
                            )}/>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({categories, posts}) {
    return {
        categories, posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => fetchCategories(dispatch),
        fetchPosts: () => fetchPosts(dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))