'use strict'

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

class FooterMenu extends React.Component {

    static propTypes = {
        menu: React.PropTypes.array.isRequired,
        hide: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        let headerMenuClass = "header-menu";
        if (this.props.parallaxIndex === 1) {
            headerMenuClass = 'header-menu fading-in';
        }
        if (this.props.parallaxIndex === 2) {
            headerMenuClass = 'header-menu fade-in';
        }

        headerMenuClass = (this.props.topMenuFixed) ? "header-menu fade-in fixed" : headerMenuClass;
        if (this.props.hide) {
            headerMenuClass += " hide";
        }

        let menuItems = [
            {index: 0, name: 'Movies'},
            {index: 1, name: 'Shows'},
            {index: 2, name: 'Subscriptions'},
            {index: 3, name: 'My Purchases'}
        ];

        return (
            <div className={headerMenuClass}>
                <label className="header-title">Store</label>
                <div className="menu-container">
                    <ul className="menu-list">
                        {_.map(menuItems, (item, index) => {
                            return (
                                <li key={index} className="menu-item">
                                    <label>{item.name}</label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="menu-underline"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        parallaxIndex: state.events.parallaxIndex,
        topMenuFixed: state.events.topMenuFixed
    };
};


export default connect(mapStateToProps)(FooterMenu);