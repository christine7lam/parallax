'use strict'

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import {playTrailer} from '../../../actions/actions';

import {State} from '../../../constants/constants';

class MoviesCarousel extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        posters: React.PropTypes.array.isRequired,
        enabled: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        let trailerPlaying = (this.props.trailerView.state !== State.Ready);
        let enabled = this.props.enabled;

        let titleClass = "carousel-title";
        if (trailerPlaying && enabled) {
            titleClass += " hide-fade-out";
        } else if (!trailerPlaying && enabled) {
            titleClass += " show-fade-in";
        }

        return (
            <div className="movies-carousel-wrap">
                <div className="movies-carousel">
                    <label className={titleClass}>{this.props.title} ></label>
                    <ul className="carousel-container">
                        {_.map(this.props.posters, (poster, index) => {
                            let {title, price} = poster;
                            let overlay = null;
                            if (poster.trailer && !trailerPlaying && enabled) {
                                overlay =
                                    <div className="movie-overlay-wrap">
                                        <div className="play-icon-wrap">
                                            <div className="play-icon">
                                                <span className="glyphicon glyphicon-play"></span>
                                            </div>
                                        </div>
                                    </div>;
                            }
                            let metadataClass = "carousel-item-metadata";
                            if (trailerPlaying) {
                                metadataClass += " hide-fade-out";
                            } else {
                                metadataClass += " show-fade-in"
                            }
                            return (
                                <li className="carousel-item" key={index} onClick={(event) => {this.playTrailer(index)}}>
                                    <img src={poster.url} />
                                    {overlay}
                                    <span className={metadataClass}>{title}<br/>{price}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    playTrailer = (index) => {
        if (index >= 0 && index < this.props.posters.length &&
                this.props.enabled && this.props.trailerView.state === State.Ready) {
            let request = this.props.posters[index];
            if (request.trailer) {
                this.props.playTrailer(request);
            } else {
                console.log("MoviesCarousel.playTrailer(): trailer not available for " + request.title);
            }
        }
    }
}

const mapStateToProps = store => {
    return {
        trailerView: {
            state: store.events.trailerView.state,
        }
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playTrailer: bindActionCreators(playTrailer, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesCarousel);