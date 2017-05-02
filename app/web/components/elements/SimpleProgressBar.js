/**
 *
 * @flow
 */

'use strict';

import React, {Component, PropTypes} from 'react';
import * as Utils from '../../../Utils/Utils';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {incrementPosterIndex} from '../../../actions/actions';

class SimpleProgressBar extends Component {

    constructor(props) {
        super(props);
        this.pb = null;
    }

    componentDidUpdate() {
        // const pb = document.getElementById(this.props.id);
        // if (pb && pb !== this.pb) {
        //     this.pb = pb;
        //     this.attachEvents(this.pb);
        // }
    }

    componentDidMount() {
        // const pb = document.getElementById(this.props.id);
        // if (pb && pb !== this.pb) {
        //     this.pb = pb;
        //     this.attachEvents(this.pb);
        // }

        const pb = this.refs.progressBar;
        if (pb && pb !== this.pb) {
            pb.addEventListener('animationend', this.endProgress);
        }
    }

    componentWillUnmount() {
        const pb = this.refs.progressBar;
        pb.removeEventListener('animationend');
    }

    endProgress = () => { // alert("detect end of progress");
        if (this.props.posterAnimating && this.props.animationPosterIndex < 4) {
            this.props.incrementPosterIndex();
        }
    }

    // attachEvents = (element: any) => {
    //     console.log(Utils.getName(this) + " attachEvents");
    //
    //     $(element)
    //         .off('animationstart').on('animationstart', (event) => {
    //         if (event.target !== event.currentTarget) {
    //             return;
    //         }
    //         console.log(Utils.getName(this) + " animationstart");
    //         })
    //
    //         .off('animationiteration').on('animationiteration', (event) => {
    //         if (event.target !== event.currentTarget) {
    //             return;
    //         }
    //         console.log(Utils.getName(this) + " animationiteration");
    //         })
    //
    //         .off('animationend').on('animationend', (event) => {
    //         if (event.target !== event.currentTarget) {
    //             return;
    //         }
    //
    //         if (this.props.posterAnimating && this.props.animationPosterIndex < 4) {
    //             this.props.incrementPosterIndex();
    //         }
    //         console.log(Utils.getName(this) + " animationend");
    //
    //         })
    //
    //         .off('transitionend').on('transitionend', (event) => {
    //         if (event.target !== event.currentTarget) {
    //             return;
    //         }
    //         console.log(Utils.getName(this) + " transitionend");
    //     });
    // };

    render() {
        let wrapClass = this.props.active ? "progress-bar-wrap simple active" : "progress-bar-wrap simple";
        let perClass = this.props.active ? "percentage active" : "percentage";

        return (
            <div className={wrapClass}>
                <div className="progress-bar">
                    <div id={this.props.id} ref="progressBar" className={perClass} style={{"width": this.props.percentage + "%"}}/>
                </div>
            </div>
        )

    }
}

SimpleProgressBar.propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool,
};

const mapStateToProps = state => {
    return {
        animationPosterIndex: state.events.animationPosterIndex,
        posterAnimating: state.events.posterAnimating
    };

};

const mapDispatchToProps = dispatch => {
    return {
        incrementPosterIndex: bindActionCreators(incrementPosterIndex, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleProgressBar);