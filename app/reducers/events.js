'use strict';

import * as cont from '../constants/constants';

import {State} from '../constants/constants';

import {SlideShowVideos} from '../data/Videos';

const MAX_LOOP_INDEX = 3;

const initialState = {
    animatingPosterActive: true,
    posterAnimating: false,
    animationPosterIndex: 0,
    backgroundVideoIndex: 4,
    isTopLayerActive: true,
    isTopPosterVisible: true,
    topMenuFixed: false,

    bgVideo: {
        selectedVideoIndex: 0,
        isPlaying: false,
        src: '/app/videos/The Flash - Extended Trailer - The CW.mp4'
    },

    trailerView: {
        state: State.Ready,
        url: null,
        title: '',
        metadata: []
    },

    parallaxIndex: -1, // number of section passed
    isVideoVisible: false,
    isVideoEventOverlayActive: false,
    endCarouselActive: false,
    pngSequenceIndex: 0,
    isPngSequencePlayed: false
};


export default function mainReducer(state = initialState, action) {

    switch(action.type) {
        case cont.UPDATE_POSTER_INDEX: {
            let nextState = {...state};
            nextState.animationPosterIndex = action.index;
            nextState.bgVideo.isPlaying = true;
            return nextState;
        }
        case cont.UPDATE_VIDEO: {
            let nextState = {...state};
            // comment out phrase ONE implementation
            // if (action.location && action.location === 1) {
            //     nextState.backgroundVideoIndex = action.index;
            //     nextState.isVideoEventOverlayActive = (action.index === 4) ? true : false;
            // } else {
            //     nextState.isVideoEventOverlayActive = false;
            // }

            nextState.bgVideo.selectedVideoIndex = action.index;
           // if (action.index) {
                nextState.bgVideo.src = SlideShowVideos[action.index].src;
           // }
            return nextState;
        }
        case cont.SHOW_HIDE_VIDEO: {
            let nextState = {...state};
            nextState.isVideoVisible = !state.isVideoVisible;
            return nextState;
        }
        case cont.INCREMENT_POSTER_INDEX: {
            let nextState = {...state};
            if (state.animationPosterIndex == MAX_LOOP_INDEX) {
                nextState.animationPosterIndex = 0;
            }
            if (state.animationPosterIndex < MAX_LOOP_INDEX) {
                nextState.animationPosterIndex++;
            }
            return nextState;
        }
        case cont.START_POSTER_ANIMATION: {
            let nextState = {...state};
            nextState.posterAnimating = !state.posterAnimating;
            return nextState;
        }
        case cont.PLAY_TRAILER_REQ: {
            if (state.trailerView.state !== State.Ready) {
                console.error("mainReducer(): invalid state = " + state.trailerView.state);
                return state;
            }
            let nextState = {...state};
            nextState.trailerView.state = State.Play;
            nextState.trailerView.url = action.request.trailer;
            nextState.trailerView.title = action.request.title;
            nextState.trailerView.metadata = action.request.metadata;
            return nextState;
        }
        case cont.PLAY_TRAILER_ACK: {
            if (state.trailerView.state !== State.Play) {
                console.error("mainReducer(): invalid state = " + state.trailerView.state);
                return state;
            }
            let nextState = {...state};
            nextState.trailerView.state = State.Playing;
            return nextState;
        }
        case cont.STOP_TRAILER: {
            if (state.trailerView.state !== State.Playing && state.trailerView.state !== State.Play) {
                console.error("mainReducer(): invalid state = " + state.trailerView.state);
                return state;
            }
            let nextState = {...state};
            nextState.trailerView.state = State.Ready;
            nextState.trailerView.url = null;
            nextState.trailerView.title = '';
            nextState.trailerView.metadata = [];
            return nextState;
        }
        case cont.TOGGLE_TOP_LAYER: {
            let nextState = {...state};
            nextState.isTopLayerActive = !state.isTopLayerActive;
            return nextState;
        }
        case cont.TURN_OFF_ANIMATING_POSTER: {
            let nextState = {...state};
            nextState.animatingPosterActive = false;
            return nextState;
        }
        case cont.TOGGLE_BG_VIDEO_PLAY_STATE: {
            let nextState = {...state};
            nextState.bgVideo.isPlaying = !state.bgVideo.isPlaying;
            return nextState;
        }
        case cont.PARALLAX_MOVEMENT_INDEX: {
            let nextState = {...state};
            nextState.parallaxIndex = action.index;
            return nextState;
        }
        case cont.SHOW_END_CAROUSEL: {
            let nextState = {...state};
            nextState.endCarouselActive = true;
            return nextState;
        }
        case cont.FIX_TOP_MENU: {
            let nextState = {...state};
            nextState.topMenuFixed = !state.topMenuFixed;
            return nextState;
        }
        case cont.UPDATE_PNG_SEQUENCE_INDEX: {
            let nextState = {...state};
            nextState.pngSequenceIndex = action.index;
            return nextState;
        }
        case cont.PNG_SEQUENCE_PLAYED: {
            let nextState= {...state};
            nextState.isPngSequencePlayed = true;
            return nextState;
        }

        default:
            return state;
    }

    return state;
}