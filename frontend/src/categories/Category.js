/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {AddOrEditPost, PostList, PostOrder} from '../app/index'

class Category extends Component {
    state = {
        newPost: false
    }

    handleSwitchToNewPost(e) {
        e.preventDefault()
        this.setState({newPost: true})
    }

    handleSwitchToViewMode() {
        this.setState({newPost: false})
    }

    render() {
        const {category} = this.props
        const {newPost} = this.state
        return (
            <div>
                {newPost && (
                    <AddOrEditPost switchToViewMode={this.handleSwitchToViewMode.bind(this)}/>
                )}
                {!newPost && (
                    <div>
                        <div>
                            <h4 className="inline-block" onClick={this.handleSwitchToNewPost.bind(this)}>
                                <a href="">
                                    <span className="glyphicon glyphicon-plus"></span>
                                    &nbsp;Post to {category.name}
                                </a>
                            </h4>
                            <div className="pull-right">
                                <PostOrder/>
                            </div>
                        </div>
                        <hr/>
                        <PostList/>

                    </div>
                )}
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