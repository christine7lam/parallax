/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

import MetaData from '../elements/MetaData';
import PosterCarousel from '../elements/PosterCarousel';
import TopPosters from '../elements/TopPosters';
import FooterMenu from '../elements/FooterMenu';
import HeaderMenu from '../elements/HeaderMenu';

import {Slideshow} from '../../../Utils/MoviesDB';
import {toggleTopLayer} from '../../../actions/actions';

class AutoPlaySection extends Component {

    constructor(props) {
        super(props);
    }

    _toggleTopLayer() {
        if(!this.props.isTopLayerActive) {
            this.props.toggleTopLayer();
        }
    }

    render() {
        let actionLayerClass = this.props.isTopLayerActive ? 'action-overlay' : 'action-overlay time-out-hide';
        let autoPlayContClass = 'auto-play-content';

        if (this.props.parallaxIndex === 1) {
            autoPlayContClass = 'auto-play-content fading-out';
        }
        if (this.props.parallaxIndex === 2) {
            autoPlayContClass = 'auto-play-content fade-out';
        }

        let metadatalist = [
            {index: 0},
            {index: 1},
            {index: 2},
            {index: 3}
        ]

        return (
            <div className="auto-play-body">
                <div className={autoPlayContClass}>
                    <TopPosters/>
                    <div onMouseEnter={(event) => {this._toggleTopLayer()}} 
                        className={actionLayerClass}>
                        <ReactCSSTransitionGroup
                            transitionAppear={true}
                            transitionAppearTimeout={1000}
                            transitionEnterTimeout={1000}
                            transitionLeaveTimeout={1000}
                            transitionName="meta-data">
                            <div className="meta-data-container">
                                {_.map(metadatalist, (pos, index) => {
                                    return (
                                        <MetaData key={index} pos={pos.index}/>
                                    )
                                })}
                            </div>
                        </ReactCSSTransitionGroup>
                        <ReactCSSTransitionGroup
                            transitionAppear={true}
                            transitionAppearTimeout={100000}
                            transitionEnterTimeout={100000}
                            transitionLeaveTimeout={100000}
                            transitionName="top-carousel">
                            <PosterCarousel posters={Slideshow} />
                        </ReactCSSTransitionGroup>
                    </div>
                    <FooterMenu/>
                </div>
                <HeaderMenu/>
            </div>
        )
    }
}

AutoPlaySection.propTypes = {};

const mapStateToProps = store => {
    return {
        isTopLayerActive: store.events.isTopLayerActive,
        parallaxIndex: store.events.parallaxIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleTopLayer: bindActionCreators(toggleTopLayer, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoPlaySection);