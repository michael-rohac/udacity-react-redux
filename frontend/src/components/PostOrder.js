/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {updateUiSettings} from '../actions'
import {CONST} from '../utils/helpers'

class PostOrder extends Component {
    constructor(props) {
        super(props);
        this.handleUpdatePostOrderDirection.bind(this);
        this.handleUpdatePostOrderBy.bind(this);
    }

    handleUpdatePostOrderDirection(e) {
        e.preventDefault();
        const {postsOrder, updateUiSettings} = this.props;
        updateUiSettings({postsOrder: {...postsOrder, ascending: !postsOrder.ascending}})
    }

    handleUpdatePostOrderBy(e) {
        e.preventDefault();
        const {postsOrder, updateUiSettings} = this.props;
        updateUiSettings({postsOrder: {...postsOrder, by: e.target.value}})
    }

    render() {
        const {postsOrder} = this.props;
        return (
            <h4>
                <a href="" title={`${postsOrder.ascending ? 'Ascending' : 'Descending'} Order`}
                   onClick={e => this.handleUpdatePostOrderDirection(e)}>
                    <span
                        className={`glyphicon ${postsOrder.ascending ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt'}`}
                        style={{marginLeft: 5, marginRight: 5}}></span>
                </a>
                <select className="" value={postsOrder.by} onChange={e => this.handleUpdatePostOrderBy(e)}>
                    <option value={CONST.ORDER_BY_VOTE_SCORE}>By vote score</option>
                    <option value={CONST.ORDER_BY_TIMESTAMP}>By date</option>
                </select>
            </h4>
        )
    }
}

function mapStateToProps({uiSettings}, {location}) {
    return {
        postsOrder: uiSettings.postsOrder
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUiSettings: (uiSettings) => updateUiSettings(uiSettings)(dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostOrder)