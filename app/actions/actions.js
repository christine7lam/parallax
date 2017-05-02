/**
 * Copyright 2016 AT&T, Inc.
 *
 * NGC actions
 *
 * @version: 1.0
 */
'use strict';

import * as cont from '../constants/constants';


//---------------//
//     GLOBAL    //
//---------------//
export function sampleAction(): Action {
    return {
        type: cont.SAMPLE,
        meta: {sound: 'bonk'}
    }
}

export function updatePosterIndex(index) {
    return {
        type: cont.UPDATE_POSTER_INDEX,
        index: index
    }
}

export function incrementPosterIndex() { 
    return {
        type: cont.INCREMENT_POSTER_INDEX
    }
}

export function startPosterAnimation() {
    return {
        type: cont.START_POSTER_ANIMATION
    }
}

export function playTrailer(request) {
    return {
        type: cont.PLAY_TRAILER_REQ,
        request: request
    };
}

export function playingTrailer() {
    return {
        type: cont.PLAY_TRAILER_ACK
    };
}

export function stopTrailer() {
    return {
        type: cont.STOP_TRAILER
    };
};
export function toggleTopLayer() {
    return {
        type: cont.TOGGLE_TOP_LAYER
    }
}

export function turnOffAnimatingPosters() {
    return {
        type: cont.TURN_OFF_ANIMATING_POSTER
    }
}

export function toggleBgVideo() {
    return {
        type: cont.TOGGLE_BG_VIDEO_PLAY_STATE
    }
}

export function showEndCarousel() {
    return {
        type: cont.SHOW_END_CAROUSEL
    }
}

export function toggleFixTopMenu() {
    return {
        type: cont.FIX_TOP_MENU
    }
}

/**
 *
 * @param index
 * @param location: 0 - from animating carousel, 1 - from scrolling
 * @returns {{type, index: *}}
 */
export function updateBackgroundVideo(index, location) {
    return {
        type: cont.UPDATE_VIDEO,
        index: index,
        location: location
    }
}

export function showHideVideo() {
    return {
        type: cont.SHOW_HIDE_VIDEO
    }
}

//-----------------//
//     PARALLAX    //
//-----------------//
export function updateParallaxIndex(index) {
    return {
        type: cont.PARALLAX_MOVEMENT_INDEX,
        index: index
    }
}

//--------------------//
//     PNG Sequence   //
//--------------------//
export function updatePngSequenceIndex(index) {
    return {
        type: cont.UPDATE_PNG_SEQUENCE_INDEX,
        index: index
    }
}

export function pngSequencePlayed() {
    return {
        type: cont.PNG_SEQUENCE_PLAYED
    }
}

