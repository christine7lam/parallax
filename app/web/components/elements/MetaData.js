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

import {startPosterAnimation} from '../../../actions/actions';

class MetaData extends Component {

    constructor(props) {
        super(props);
    }

    _toggleAnimation() {
        if (this.props.animatingPosterActive) {
            this.props.startPosterAnimation();
        }
    }


    render() {
        let titles = [
            {index: 0, name: "The Flash"},
            {index: 1, name: "Rogue One: A Star Wars Story"},
            {index: 2, name: "Moonlight"},
            {index: 3, name: "La La Land"}
        ];
        let metalist = [
            {index: 0, list: ["2017", "R", "Drama, Real, Gritty, Beautifully shot"] },
            {index: 1, list: ["2017", "PG-13", "Kids, Fun"] },
            {index: 2, list: ["2017", "PG", "Action"] },
            {index: 3, list: ["2017", "R", "Sci-Fi"] }
        ];

        let metaDataWrapClass = this.props.isTopLayerActive ? 'meta-data-wrap' : 'meta-data-wrap slide-down';
        metaDataWrapClass += (this.props.animationPosterIndex === this.props.pos) ? ' active' : ' inactive';


        return (

            <div onMouseEnter={(event) => {this._toggleAnimation()}}
                 onMouseLeave={(event) => {this._toggleAnimation()}}
                 className={metaDataWrapClass}>
                <div className="title">
                    <label>{titles[this.props.pos].name}</label>
                </div>
                <div className="meta-list">
                    <ul className="meta-list-wrap">
                        {_.map(metalist[this.props.pos].list, (item, index) => {
                            return (
                                <li key={index} className="meta-list-item">{item}</li>
                            )
                        })}
                    </ul>
                </div>
                <div className="buy-now">
                    <div className="dollar-icon"><span className="glyphicon glyphicon-usd"></span></div>
                    <div className="buy-label">Buy now for $4.99</div>
                </div>
            </div>
        );
    }
}

MetaData.propTypes = {
    //title: PropTypes.string
};

const mapStateToProps = state => {
    return {
        animationPosterIndex: state.events.animationPosterIndex,
        isTopLayerActive: state.events.isTopLayerActive,
        animatingPosterActive: state.events.animatingPosterActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startPosterAnimation: bindActionCreators(startPosterAnimation, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetaData);
