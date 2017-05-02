'use strict'

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

class PNGSequence extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        let sqIndex = (this.props.pngSequenceIndex < 10) ? '0'+this.props.pngSequenceIndex : this.props.pngSequenceIndex;
        let sequenceImg = '/app/images/MonsterPNGSequence/MonsterMonday Video0'+sqIndex+'.png';

        return (
            <div className="png-sequence-wrap">
                <img src={sequenceImg} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        pngSequenceIndex: state.events.pngSequenceIndex
    };
};


export default connect(mapStateToProps)(PNGSequence);