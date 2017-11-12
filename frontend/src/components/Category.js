/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PostList from './PostList'
import {CONST} from '../utils/helpers'

class Category extends Component {
    shouldUpdateComponent() {
        console.log('dsfas')
    }
    render() {
        const {category, posts, uiSettings} = this.props;
        let {order} = uiSettings.posts;
        return (
            <div>
                <div>
                    <h4 className="inline-block">
                        <Link to={`/${category.path}/posts`}>
                            <span className="glyphicon glyphicon-plus"></span>
                            &nbsp;Post to {category.name}
                        </Link>
                    </h4>
                    <div className="pull-right">
                        <h4>
                            <a href="" title={`${order.ascending ? 'Ascending' : 'Descending'} Order`} onClick={e => {
                                e.preventDefault();
                                order.ascending = !order.ascending;
                                this.setState({order: order})
                            }}>

                                <span
                                    className={`glyphicon ${order.ascending ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt'}`}
                                    style={{marginLeft: 5, marginRight: 5}}></span>
                            </a>
                            <select className="" value={order.by} onChange={e => {
                                order.by = e.target.value
                                this.setState({order: order})
                            }}>
                                <option value={CONST.ORDER_BY_VOTE_SCORE}>By vote score</option>
                                <option value={CONST.ORDER_BY_TIMESTAMP}>By date</option>
                            </select>
                        </h4>
                    </div>
                </div>
                <hr/>
                <PostList/>
            </div>
        )
    }
}

function mapStateToProps({categories, posts, uiSettings}, {location}) {
    const categoryPath = location.pathname.substring(1);
    return {
        category: categories[categoryPath],
        posts: !posts[categoryPath] ? [] : Object.keys(posts[categoryPath]).map(postId => posts[categoryPath][postId]),
        uiSettings
    }
}

export default withRouter(connect(mapStateToProps)(Category))