import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link, Route, withRouter} from 'react-router-dom'

import '../styles/App.css';

import {fetchPosts} from "../actions"
import {capitalize} from '../utils/helpers'
import * as Api from '../utils/api'

import Category from './Category'

class App extends Component {
    state = {
        categories: [],
        initialized: false
    }

    componentDidMount() {
        // issue API call only for very first application visit
        if (this.state.initialized) return;
        Api.fetchCategories()
            .then((data) => {
                const {categories} = data;
                this.setState({
                    categories: categories.map(category => {
                        return {
                            name: capitalize(category.name),
                            path: category.path
                        }
                    })
                })
            });
        this.props.fetchPosts();
        this.setState({initialized: true});
    }

    render() {
        const {categories} = this.state;
        const {posts, location} = this.props;
        return (
            <div className="App">
                <div className="page-header text-center">
                    <h1 title="Project demonstrating React & Redux in action">Udacity Readable</h1>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <Route path="/" render={() => (
                                <ul className="nav nav-pills nav-stacked">
                                    <h4>Available Topics:</h4>
                                    {categories.map((category) => (
                                        <li key={category.path} className={location.pathname === '/' + category.path ? 'active' : ''}>
                                            <Link to={'/' + category.path}>{category.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}/>
                        </div>

                        <div className="col-lg-10 col-md-9 col-sm-6">
                            {
                                this.state.categories.map(category => (
                                    <Route exact key={category.path} path={'/' + category.path} render={() => (
                                        <Category category={category} posts={posts[category.path] || []}/>
                                    )}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({posts}) {
    return {
        posts: posts.reduce((acc, post) => {
            if (!acc[post.category]) acc[post.category] = [];
            acc[post.category].push(post);
            return acc;
        }, {})
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => fetchPosts(dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))