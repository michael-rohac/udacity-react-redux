/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';

class Voter extends Component {
    render() {
        const {upVote, downVote} = this.props
        return (
            <div className="inline-block">
                <span>
                    <b><em>Vote:</em></b>
                </span>
                <a href="" onClick={e => {
                    e.preventDefault();
                    downVote && downVote();
                }}>
                    <span className="glyphicon glyphicon-thumbs-down" style={{marginLeft: 5, marginRight: 5}}></span>
                </a>
                <a href="" onClick={e => {
                    e.preventDefault();
                    upVote && upVote();
                }}>
                    <span className="glyphicon glyphicon-thumbs-up" style={{marginLeft: 5, marginRight: 5}}></span>
                </a>
            </div>
        )
    }
}

export default Voter
