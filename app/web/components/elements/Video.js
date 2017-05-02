/**
 *
 * @flow
 */

'use strict'

import React, {Component} from 'react';
import {connect} from 'react-redux';

import VideoEventOverlay from '../elements/VideoEventOverlay';
import ListBackground from '../elements/ListBackground';
import PNGSequence from '../elements/PNGSequence';

class Video extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.bgVideo.src !== this.props.bgVideo.src) {
            this.refs.video.load();
            this.refs.video.play();
            return true;
        }

        if (!nextProps.bgVideo.isPlaying) {
            this.refs.video.pause();
            return true;
        } else {
            this.refs.video.play();
            return true;
        }

        return false;
    }

    render() {
        let listBackground = (this.props.parallaxIndex === 3) ? <ListBackground/> : null;
        let videoContClass = ((this.props.parallaxIndex >= 3 && this.props.parallaxIndex < 3.5) ||
        (this.props.parallaxIndex >= 6 && this.props.isPngSequencePlayed)) ? 'background-video hide' : 'background-video';

       // let pngSequence = (this.props.parallaxIndex >= 4) ? <PNGSequence/> : null;
        let pngOverlayClass = ((this.props.parallaxIndex >= 3.5 && this.props.isPngSequencePlayed)) ? "static-last-png" : "static-last-png hide";

        return (
            <div id="videoCont" className="video-cont">
                {listBackground}
                {/*{pngSequence}*/}
                <div className={pngOverlayClass}><img src="/app/images/MonsterPNGSequence/MonsterMonday Video099.png" /></div>
                <video className={videoContClass} ref="video" width="100%" autoplay>
                    <source src={this.props.bgVideo.src} type="video/mp4" />
                </video>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bgVideo: {
            isPlaying: state.events.bgVideo.isPlaying,
            src: state.events.bgVideo.src
        },
        parallaxIndex: state.events.parallaxIndex,
        isPngSequencePlayed: state.events.isPngSequencePlayed

    };
};

export default connect(mapStateToProps)(Video);
