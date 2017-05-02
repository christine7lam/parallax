/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class VideoEventOverlay extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className="video-event-overlay">
                <div className="ve-content-wrap">
                    <center>
                        <img src="/app/images/TheOscarsLogo.png"/>

                    <div className="action-box">
                        <label>View All</label>
                    </div>
                    </center>
                </div>
            </div>
        )
    }
}

VideoEventOverlay.propTypes = {
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(VideoEventOverlay);
