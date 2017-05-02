/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class FooterMenu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let menuItems = [
            {index: 0, name: 'Movies'},
            {index: 1, name: 'Shows'},
            {index: 2, name: 'Subscriptions'},
            {index: 3, name: 'My Purchases'}
        ]

        let footerClass = this.props.isTopLayerActive ? 'footer-menu' : 'footer-menu slide-down';
        footerClass += (this.props.parallaxIndex === 1) ? ' hide' : '';

        return (
            <div className={footerClass}>
                <div className="menu-container">
                    <ul className="menu-list">
                        {_.map(menuItems, (item, index) => {

                            return (
                                <li key={index} className="menu-item">
                                    <label>{item.name}</label>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

FooterMenu.propTypes = {

};

const mapStateToProps = state => {
    return {
        isTopLayerActive: state.events.isTopLayerActive,
        parallaxIndex: state.events.parallaxIndex
    };
};


export default connect(mapStateToProps)(FooterMenu);
