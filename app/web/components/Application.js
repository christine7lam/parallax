/**
 *
 * @flow
 */

'use strict'

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as winProps from '../../Utils/ScreenDimensions';
import Video from './elements/Video';
import ScrollableContent from './ScrollableContent';
import HeaderMenu from './elements/HeaderMenu';

import {toggleBgVideo, updateParallaxIndex, updateBackgroundVideo,
        showEndCarousel, toggleFixTopMenu, updatePngSequenceIndex,
        showHideVideo, pngSequencePlayed} from '../../actions/actions';

class Application extends Component {

    constructor(props) {
        super(props);
    }

    _handleScroll = (event) => {
        let scrollDist = winProps.getYScrollPos();
        let scrHt = winProps.getScreenHeight();

        // Merge 2 duplicate menu
        this._mergeMenu(scrollDist);

        // Pause Video when scrolling half way through the top poster
        this._toggleVideoPlay(scrollDist);

        // Fix top menu
        this._fixTopMenu(scrollDist);

        // Show Ensamble area
        this._showEnsambleArea(scrollDist);


        // Start PNG sequence
        this._startPNGSequencce(scrollDist);

        // Fade out second white section
        this._fadeOutSecWhiteSection(scrollDist);

        // Show End Carousel
        if (!this.props.endCarouselVisible && this.props.parallaxIndex >=3.5) {
            setTimeout(() => this._showMonsterCarousel(scrollDist), 2500);
        }

        // Show Grids
        this._showGrids(scrollDist);
    }

    _mergeMenu = (scrollDist) => {
        if (scrollDist >=100 && scrollDist <=200) {
            this.props.updateParallaxIndex(1);
        }
        if (scrollDist <100) {
            this.props.updateParallaxIndex(-1);
        }
    }

    _toggleVideoPlay = (scrollDist) => {
        if (scrollDist >= 300 && scrollDist <= 400) {
            if (this.props.isVideoVisible && this.props.bgVideo.isPlaying) {
                this.props.toggleBgVideo();
            }
            this.props.updateParallaxIndex(2);
        }
        if (scrollDist >= 200 && scrollDist <= 300) {
            if (this.props.isVideoVisible && !this.props.bgVideo.isPlaying) {
                this.props.toggleBgVideo();
            }
        }
    }

    _fixTopMenu = (scrollDist) => {
        if (scrollDist >=800 && scrollDist <=1100) {
            if (!this.props.topMenuFixed) {
                this.props.toggleFixTopMenu();
            }
        }
        if (scrollDist >=500 && scrollDist <=800) {
            if (this.props.topMenuFixed) {
                this.props.toggleFixTopMenu();
            }
        }
    }

    _showEnsambleArea(scrollDist) {
        if ((scrollDist >=1100 && scrollDist <=1200) ||
            (scrollDist >=2450 && scrollDist <=2650)){
            this.props.updateParallaxIndex(3);
            this.props.updateBackgroundVideo(this.props.animationPosterIndex, 1);
        }
    }

    _startPNGSequencce(scrollDist) {
        // Mount PNG Video
        if (scrollDist >=2680 && scrollDist <=2780) {
            this.props.updateParallaxIndex(3.5);
            if (!this.props.isPngSequencePlayed) {
                this.props.updateBackgroundVideo(6, 1);
                if (!this.props.isVideoVisible) {
                    this.props.showHideVideo();
                }
            }
        }
        // Start PNG video
        if (scrollDist >=3400 && scrollDist <=3500) {
            if (this.props.isVideoVisible && !this.props.bgVideo.isPlaying) {
                this.props.toggleBgVideo();
            }
        }


        // let startDist = 3400;
        // // sequence plays over 100 frames, 20 scroll per frame
        // let endDist = 8400;
        // if (scrollDist >= startDist && scrollDist <= endDist) {
        //     let sqIndex = Math.floor((scrollDist - startDist) / 20);
        //     this.props.updatePngSequenceIndex(sqIndex);
        // }
    }


    _fadeOutSecWhiteSection(scrollDist) {
        if (scrollDist >=3375 && scrollDist <=3475) {
            this.props.updateParallaxIndex(6);
        }
        if (scrollDist >=3275 && scrollDist <=3375) {
            this.props.updateParallaxIndex(5);
        }
        if (scrollDist >=3175 && scrollDist <=3275) {
            this.props.updateParallaxIndex(4);
        }
    }

    _showMonsterCarousel(scrollDist) {
        if (!this.props.endCarouselVisible) {
            if (scrollDist >= 3400 && scrollDist <= 3500) {
                if (!this.props.endCarouselVisible) {
                    this.props.showEndCarousel();
                }
                this.props.pngSequencePlayed();
            }
        }
    }

    _showGrids(scrollDist) {
        if (scrollDist >= 3835 && scrollDist <= 3935) {
            this.props.updateParallaxIndex(8);
        }
        if (scrollDist >= 3735 && scrollDist <= 3835) {
            this.props.updateParallaxIndex(7);
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    render() {
        let menu = [
            "Movies",
            "Shows",
            "Subscriptions",
            "My Purchases"
        ];
        let headerMenu = (this.props.topMenuFixed) ?  <HeaderMenu menu={menu} /> : null;

        return (
            <div className="store-body">
                {headerMenu}
                <Video />
                <ScrollableContent/>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        animationPosterIndex: store.events.animationPosterIndex,
        topMenuFixed: store.events.topMenuFixed,
        bgVideo: {
            isPlaying: store.events.bgVideo.isPlaying
        },
        endCarouselVisible: store.events.endCarouselVisible,
        isVideoVisible: store.events.isVideoVisible,
        parallaxIndex: store.events.parallaxIndex,
        isPngSequencePlayed: store.events.isPngSequencePlayed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleBgVideo: bindActionCreators(toggleBgVideo, dispatch),
        updateParallaxIndex: bindActionCreators(updateParallaxIndex, dispatch),
        updateBackgroundVideo: bindActionCreators(updateBackgroundVideo, dispatch),
        showEndCarousel: bindActionCreators(showEndCarousel, dispatch),
        toggleFixTopMenu: bindActionCreators(toggleFixTopMenu, dispatch),
        updatePngSequenceIndex: bindActionCreators(updatePngSequenceIndex, dispatch),
        showHideVideo: bindActionCreators(showHideVideo, dispatch),
        pngSequencePlayed: bindActionCreators(pngSequencePlayed, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);