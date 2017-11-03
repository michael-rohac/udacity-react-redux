/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';

class Category extends Component {
    render() {
        return (
            <h3>{this.props.name}</h3>
        )
    }
}

export default Category