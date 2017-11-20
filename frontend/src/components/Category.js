/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PostList from './PostList'
import PostOrder from './PostOrder'

class Category extends Component {
    render() {
        const {category} = this.props;
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
                        <PostOrder/>
                    </div>
                </div>
                <hr/>
                <PostList/>
            </div>
        )
    }
}

function mapStateToProps({categories}, {location}) {
    const categoryPath = location.pathname.substring(1);
    return {
        category: categories[categoryPath]
    }
}

export default withRouter(connect(mapStateToProps)(Category))