/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class PosterOverlay extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="poster-overlay-wrap">
                <div className="drop-shadow"></div>
                <div className="play-icon-wrap">
                    <div className="play-icon">
                        <span className="glyphicon glyphicon-play"></span>
                    </div>
                </div>
            </div>
        )
    }
}

PosterOverlay.propTypes = {

};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(PosterOverlay);