/**
 *
 * @flow
 */

'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {updatePosterIndex, updateBackgroundVideo, startPosterAnimation,
        toggleTopLayer, turnOffAnimatingPosters, showHideVideo} from '../../../actions/actions';
import SimpleProgressBar from '../elements/SimpleProgressBar';
import PosterOverlay from '../elements/PosterOverlay';

class PosterCarousel extends React.Component {

    static propTypes = {
        posters: React.PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    _handleClick = (index) => {
        this.props.updatePosterIndex(index);
        this.props.updateBackgroundVideo(index);
        this.props.toggleTopLayer();
        this.props.turnOffAnimatingPosters();
        if (!this.props.isVideoVisible) {
            this.props.showHideVideo();
        }

    }

    _toggleAnimation = () => {
        if (this.props.animatingPosterActive) {
            this.props.startPosterAnimation();
        }
    }

    render() {
        let posArray = this.props.posters;
        let topCarouselClass = (this.props.isTopLayerActive) ? "poster-carousel" : "poster-carousel slide-down";

        return (
            <div className={topCarouselClass}>
                <ul onMouseEnter={(event) => {this._toggleAnimation()}}     onMouseLeave={(event) => {this._toggleAnimation()}}
                    className="carousel-container">
                    {_.map(posArray, (poster, index) => {

                        console.log("**************"+this.props.animationPosterIndex);
                        let activeClass = (this.props.animatingPosterActive && this.props.posterAnimating && index === this.props.animationPosterIndex) ? true : false;
                        return (
                            <li onClick={(event) => {this._handleClick(index)}}
                                key={index} className="top-carousel-poster">
                                <img src={poster.url}/>
                                <PosterOverlay/>
                                <SimpleProgressBar id={"spb-" + index} percentage={0} active={activeClass}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posterAnimating: state.events.posterAnimating,
        animationPosterIndex: state.events.animationPosterIndex,
        isTopLayerActive: state.events.isTopLayerActive,
        animatingPosterActive: state.events.animatingPosterActive,
        isVideoVisible: state.events.isVideoVisible
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePosterIndex: bindActionCreators(updatePosterIndex, dispatch),
        startPosterAnimation: bindActionCreators(startPosterAnimation, dispatch),
        toggleTopLayer: bindActionCreators(toggleTopLayer, dispatch),
        turnOffAnimatingPosters: bindActionCreators(turnOffAnimatingPosters, dispatch),
        updateBackgroundVideo: bindActionCreators(updateBackgroundVideo, dispatch),
        showHideVideo: bindActionCreators(showHideVideo, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PosterCarousel);
