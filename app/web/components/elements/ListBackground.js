/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ListBackground extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="list-background">
                <div className="list-bg-content-wrap">
                   <ul className="bg-posters">
                       <li className="left">
                           <img src="/app/images/misc/ComngSoon_SpiderMan_BG.png"/>
                       </li>
                       <li className="right">
                           <img src="/app/images/misc/Top30_LaLaLand_BG.png"/>
                       </li>
                   </ul>
                </div>
            </div>
        )
    }
}

ListBackground.propTypes = {
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(ListBackground);
