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


class TopPosters extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.animatingPosterActive) {
            this.props.startPosterAnimation();
        }
    }


    render() {
        let posters = [
            {index: 0, url: '/app/images/slideShows/promo_3-Chip.png'},
            {index: 1, url: '/app/images/slideShows/promo_2-Chip.png'},
            {index: 2, url: '/app/images/slideShows/promo_1-Chip.png'},
            {index: 3, url: '/app/images/slideShows/promo_4-Chip.png'}
        ]


        let topPosterClass = (this.props.animatingPosterActive) ? "store-top-posters" : "store-top-posters fade-out";
        return (
            <div className={topPosterClass}>
                <ul className="top-poster-container">
                {_.map(posters, (poster, index) => {
                    let activePos = (index < (this.props.animationPosterIndex)) ? "top-poster slide-over" : "top-poster";
                    activePos += (index === this.props.animationPosterIndex) ? " active" : "";
                    return (
                        <li key={index} className={activePos}>
                            <img src={poster.url} width="100%" height="100%"/>
                        </li>
                    )
                 })}
                </ul>
            </div>
        )
    }
}

TopPosters.propTypes = {

};

const mapStateToProps = state => {
    return {
        posterAnimating: state.events.posterAnimating,
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


export default connect(mapStateToProps, mapDispatchToProps)(TopPosters);
