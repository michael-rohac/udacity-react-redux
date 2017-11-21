/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';

class Comment extends Component {
    render() {
        const {comment} = this.props
        return (
            <div className="panel panel-default">
                <div className="panel-heading center">
                    <span className="glyphicon glyphicon-comment extra-margin-lr"></span>
                    {comment.author}
                </div>
                <div className="panel-body">
                    {comment.body}
                </div>
            </div>
        )
    }
}

/*
            <div className="media">
                <div className="media-left">
                    <span className="glyphicon glyphicon-comment"></span>
                </div>
                <div className="media-body">
                    <div className="media-heading">Author: {comment.author}</div>
                    {comment.body}
                </div>
            </div>
*/
export default Comment