'use strict'

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Button from '../elements/Button';
import MoviesCarousel from '../elements/MoviesCarousel';
import VideoOverlay from '../elements/VideoOverlay';

import {State} from '../../../constants/constants';

class Selections extends React.Component {

    static propTypes = {
        enabled: React.PropTypes.bool.isRequired,
        movies: React.PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        let selBodyClass = "selections-body";

        if (this.props.parallaxIndex === 1 || this.props.parallaxIndex === 5) {
            selBodyClass = 'selections-body fading-in';
        }
        if (this.props.parallaxIndex === 6) {
            selBodyClass = 'selections-body fade-out';
        }
        if (this.props.parallaxIndex >= 2 && this.props.parallaxIndex < 5) {
            selBodyClass = 'selections-body fade-in';
        }
        let trailer = null;
        let buyNow = null;
        if (this.props.trailerView.state !== State.Ready && this.props.enabled) {
            trailer = <VideoOverlay key="dead"/>;
            buyNow = <Button key="beef" label="Buy CTA" />;
            selBodyClass += " obscure";
        }
        return (
            <div className={selBodyClass}>

                <div className="video-overlay-container">
                    <center>
                        <ReactCSSTransitionGroup transitionAppear={true}
                                                 transitionAppearTimeout={2000}
                                                 transitionEnterTimeout={2000}
                                                 transitionLeaveTimeout={300}
                                                 transitionName="trailer">
                            {trailer}
                        </ReactCSSTransitionGroup>
                    </center>
                    <ReactCSSTransitionGroup transitionAppear={true}
                                             transitionAppearTimeout={2000}
                                             transitionEnterTimeout={2000}
                                             transitionLeaveTimeout={1000}
                                             transitionName="pop-up">

                        {buyNow}
                    </ReactCSSTransitionGroup>
                </div>
                {
                    _.map(this.props.movies, (carousel, index) => {
                        return (
                            <MoviesCarousel key={index}
                                            index={index}
                                            enabled={this.props.enabled}
                                            title={carousel.title}
                                            posters={carousel.list} />
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posterIndex: state.events.posterIndex,
        parallaxIndex: state.events.parallaxIndex,
        trailerView: {
            state: state.events.trailerView.state
        }
    };
};

export default connect(mapStateToProps)(Selections);