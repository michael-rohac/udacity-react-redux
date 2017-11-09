/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';

class EditPost extends Component {
    render() {
        const {match} = this.props
        return (
            <div>{!match.params || !match.params.id ? 'New' : 'Edit'} Post: {match.url}</div>
        )
    }
}

export default EditPost