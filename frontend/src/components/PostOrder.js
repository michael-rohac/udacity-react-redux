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

    handleUpdatePostOrderBy(e, value) {
        e.preventDefault();
        const {postsOrder, updateUiSettings} = this.props;
        updateUiSettings({postsOrder: {...postsOrder, by: value || e.target.value}})
    }

    render() {
        const {postsOrder} = this.props;
        // arg-less call retrieves current order.by
        const orderBy = (customOrderBy) => {
            switch (customOrderBy || postsOrder.by) {
                case CONST.ORDER_BY_VOTE_SCORE:
                    return 'By vote score'
                case CONST.ORDER_BY_TIMESTAMP:
                    return 'By date';
                default:
                    return ''
            }
        }
        return (
            <div>
                <h5 className="inline-block">Posts ordering:&nbsp;</h5>
                <h4 className="inline-block">
                    <div className="btn-group">
                        <button className="btn btn-default" onClick={e => this.handleUpdatePostOrderDirection(e)}>
                            <span className={`glyphicon ${postsOrder.ascending ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt'}`}></span>
                        </button>
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            {orderBy()}&nbsp;
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li className={postsOrder.by === CONST.ORDER_BY_VOTE_SCORE ? 'active' : ''}>
                                <a href="" onClick={e => this.handleUpdatePostOrderBy(e, CONST.ORDER_BY_VOTE_SCORE)}>{orderBy(CONST.ORDER_BY_VOTE_SCORE)}</a>
                            </li>
                            <li className={postsOrder.by === CONST.ORDER_BY_TIMESTAMP ? 'active' : ''}>
                                <a href="" onClick={e => this.handleUpdatePostOrderBy(e, CONST.ORDER_BY_TIMESTAMP)}>{orderBy(CONST.ORDER_BY_TIMESTAMP)}</a>
                            </li>
                        </ul>
                    </div>
                </h4>
            </div>
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