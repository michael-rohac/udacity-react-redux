/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';

class DropdownMenu extends Component {
    render() {
        const {menu} = this.props;
        const dropdownToggleIcon = menu.dropdownToggleIcon || 'glyphicon glyphicon-th'
        return (
            <div className="btn-group">
                <a href="" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className={dropdownToggleIcon}></span>
                </a>
                <ul className="dropdown-menu">
                    {menu.menuItems.map(menuItem => (
                        <li key={menuItem.id}>
                            <a href=""
                               onClick={e => {
                                   e.preventDefault()
                                   menuItem.action && menuItem.action()
                               }}>
                                <span className={menuItem.iconClass}></span>
                                &nbsp;{menuItem.displayName}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default DropdownMenu
