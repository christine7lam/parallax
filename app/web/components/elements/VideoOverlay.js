'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Title from './Title';
import MetadataList from './MetadataList';

import {
    playingTrailer,
    stopTrailer
} from '../../../actions/actions';

import {State} from '../../../constants/constants';

// controls should hide CONTROLS_VISIBLE_TIMEOUT ms after inactivity, currently set to 3s
const CONTROLS_VISIBLE_TIMEOUT = 3000;

class VideoOverlay extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        // task to clear video controls after CONTROLS_VISIBLE_TIMEOUT ms of inactivity
        this.task = null;
        // controls are initially visible
        this.state = {
            controlsVisible: true
        };
    }

    componentWillMount() {
        // start listening for keyDown, wheel and mouseMove events
        window.addEventListener('keydown', this.handleKeyDownEvent);
        window.addEventListener('mousemove', this.handleMouseMove);
        // window.addEventListener('wheel', this.handleScroll);

        // schedule task to clear controls
        this.task = setTimeout(this.hideControls, CONTROLS_VISIBLE_TIMEOUT)
    }

    componentWillUnmount() {
        // stop listening for keyDown, wheel and mouseMove events
        window.removeEventListener('keydown', this.handleKeyDownEvent);
        window.removeEventListener('mousemove', this.handleMouseMove);
        // window.removeEventListener('wheel', this.handleScroll);

        // pause and unload video
        this.refs.video.pause();
        this.refs.video.src = "";
        this.refs.video.load();

        // clear any pending tasks
        if (this.task) {
            clearTimeout(this.task);
            this.task = null;
        }
    }

    componentDidMount() {
        // start playback
        this.refs.video.play();
    }

    render() {
        let src = this.props.trailerView.url;
        let controlsClass = "controls-overlay-wrap";
        if (!this.state.controlsVisible) {
            controlsClass += " hide-fade-out";
        } else {
            controlsClass += " show-fade-in";
        }
        let controls = (
            <div className={controlsClass}>
                <div className="close-icon-wrap">
                        <span className="glyphicon glyphicon-remove"
                              onClick={(event) => {this.onClose(event)}}></span>
                </div>
                <Title title={this.props.trailerView.title} />
                <MetadataList list={this.props.trailerView.metadata} />
                <div className="fullscreen-icon-wrap">
                        <span className="glyphicon glyphicon-resize-full"
                              onClick={(event) => {this.onFullscreen(event)}}></span>
                </div>
                <div className="more-icon-wrap">
                        <span className="glyphicon glyphicon-option-horizontal"
                              onClick={(event) => {this.onMore(event)}}></span>
                </div>
            </div>
        );
        return (
            <div className="video-overlay-wrap">
                <video ref="video" className="video-overlay"
                       style={{height: 648, width: 1152}}
                       onTimeUpdate={this.onTimeUpdate}
                       onPlaying={this.onPlaying}
                       onPlay={this.onPlay}
                       onPause={this.onPause}
                       onSeeked={this.onSeeked}
                       onEnded={this.onEnded}
                       onError={this.onError}
                       onRateChange={this.onRateChange}>
                    <source src={src} type='video/mp4'/>
                </video>
                {controls}
            </div>
        );
    }

    onClose = (event) => {
        if (this.props.trailerView.state === State.Playing) {
            this.props.stopTrailer();
        }
    };

    onFullscreen = (event) => {
        console.log("VideoOverlay.onFullscreen()");
    };

    onMore = (event) => {
        console.log("VideoOverlay.onMore()");
    };

    onTimeUpdate = (event) => {
        // console.log("VideoOverlay.onTimeUpdate(): current=" + event.target.currentTime +
        //     ", duration=" + event.target.duration +
        //     ", speed=" + this.refs.video.playbackRate);
    };

    onPlay = () => {
        // console.log("VideoOverlay.onPlay(): speed=" + this.refs.video.playbackRate);
    };

    onPlaying = () => {
        // console.log("VideoOverlay.onPlaying(): speed=" + this.refs.video.playbackRate);
        if (this.props.trailerView.state === State.Play) {
            this.props.playingTrailer();
        }
    };

    onPause = () => {
        // console.log("VideoOverlay.onPause(): speed=" + this.refs.video.playbackRate);
    };

    onSeeked = () => {
        // console.log("VideoOverlay.onSeeked(): speed=" + this.refs.video.playbackRate);
    };

    onEnded = () => {
        // console.log("VideoOverlay.onEnded(): speed=" + this.refs.video.playbackRate);
        //if (this.props.trailerView.state === State.Playing) {
        //    this.props.stopTrailer();
        //}
    };

    onError = () => {
        // console.log("VideoOverlay.onError(): speed=" + this.refs.video.playbackRate);
    };

    onRateChange = () => {
        // console.log("VideoOverlay.onRateChange(): speed=" + this.refs.video.playbackRate);
    };

    handleKeyDownEvent = (event) => {
        switch (event.keyCode) {
            case 27: // ESC
                if (this.props.trailerView.state === State.Playing) {
                    this.props.stopTrailer();
                }
                break;
            // case 37: // Left
            // case 38: // Up
            // case 39: // Right
            // case 40: // Down
            // case 32: // Space
            // case 33: // Page up
            // case 34: // Page down
            // case 35: // End
            // case 36: // Home
            //     if (event.preventDefault) event.preventDefault();
            //     if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            //     break;
            default:
                break;
        }
    };

    // handleScroll = (event) => {
    //     event = event || window.event;
    //     if (event.preventDefault) event.preventDefault();
    //     event.returnValue = false;
    // };

    handleMouseMove = () => {
        // mouse moved, clear task to clear controls
        if (this.task) {
            clearTimeout(this.task);
        }
        // show controls
        this.showControls();
        // schedule task to clear controls
        this.task = setTimeout(this.hideControls, CONTROLS_VISIBLE_TIMEOUT)
    };

    showControls = () => {
        // show controls
        this.setState({
            controlsVisible: true
        });
    };

    hideControls = () => {
        // hide controls
        this.setState({
            controlsVisible: false
        });
    };
}

const mapStateToProps = store => {
    return {
        trailerView: {
            state: store.events.trailerView.state,
            url: store.events.trailerView.url,
            title: store.events.trailerView.title,
            metadata: store.events.trailerView.metadata
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        playingTrailer: bindActionCreators(playingTrailer, dispatch),
        stopTrailer: bindActionCreators(stopTrailer, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoOverlay);