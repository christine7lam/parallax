/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {updatePosterIndex} from '../../../actions/actions';

class Menu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let menuItems = [
            {index: 0, name: 'My TV'},
            {index: 1, name: 'Library'},
            {index: 2, name: 'Explore'},
            {index: 3, name: 'Guide'}
        ]

        let self = this;
        return (
            <div className="web-menu">
                <div className="directv-logo">DIRECT TV</div>
                    <ul className="menu-container">
                        {_.map(menuItems, function(item, index) {

                            return (
                                <li key={index} className="menu-item">
                                    <img src={item.name} />
                                </li>
                            )
                        })};
                    </ul>
                <input type="text" placeholder="TV Shows, Movies, Keywords"/>
                <div className="config-logo">Config</div>
            </div>
        )
    }
}

Menu.propTypes = {
    // posters: PropTypes.Object.isRequired;
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        updatePosterIndex: bindActionCreators(updatePosterIndex, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
