import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route, withRouter} from 'react-router-dom'

import '../styles/App.css';

import {fetchCategories, fetchPosts} from "../actions"

import Category from './Category'
import PostList from './PostList'
import EditPost from './EditPost'
import PostOrder from './PostOrder'

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
        const {categories, location, history} = this.props;
        return (
            <div className="App">
                <div className="page-header text-center">
                    <h1 title="Project demonstrating React & Redux in action">Udacity Readable</h1>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <Route path="/" render={() => (
                            <div>
                                <div className="col-lg-2 col-md-3 col-sm-6">
                                    <ul className="nav nav-pills nav-stacked">
                                        <h4>Available Topics:</h4>
                                        {categories.map((category) => (
                                            <li key={category.path}
                                                className={location.pathname.startsWith(`/${category.path}`) ? 'active' : ''}>
                                                <a href=""
                                                   onClick={e => {
                                                       e.preventDefault();
                                                       const newPath = `/${category.path}`;
                                                       history.push(newPath !== location.pathname ? newPath : '');
                                                   }}>{category.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-lg-10 col-md-9 col-sm-6">
                                    {location.pathname === '/' && (
                                        <div>
                                            <PostOrder/>
                                            <hr/>
                                            <PostList/>
                                        </div>
                                    )}
                                    {categories.map(category => (
                                        <div key={category.path}>
                                            <Route exact path={`/${category.path}`} component={Category}/>
                                            <Route exact path={`/${category.path}/posts`} component={EditPost}/>
                                            <Route exact path={`/${category.path}/posts/:id`} component={EditPost}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({categories}) {
    return {
        categories: Object.keys(categories).map(path => categories[path])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCategories: () => fetchCategories(dispatch),
        fetchPosts: () => fetchPosts(dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))