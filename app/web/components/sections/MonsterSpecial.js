'use strict'

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import {Movies} from '../../../Utils/MoviesDB';
import MovieCarousel from '../elements/MoviesCarousel';

class MonsterSpecial extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            shiftMsCarousel: false
        }
    }

    _handleClick = () => {
        this.setState({
            shiftMsCarousel: true
        })
    }

    render() {
        let carousel = Movies[0];
        let shiftOver = this.state.shiftMsCarousel ? "shift-over" : "";
        let endCarouseClass = (this.props.endCarouselVisible) ? "end-carousel activate "+shiftOver : "end-carousel "+shiftOver;
        let msTitleClass = "ms-title-wrap "+shiftOver;
        let nextAwClass = "next-arrow "+shiftOver;
        let msContClass = (this.props.endCarouselVisible) ? "ms-content activate" : "ms-content";

        return (
            <div className="monster-special-wrap">
                <div className={msContClass}>
                     <div className={msTitleClass}>
                         <label className="title">Monster Rampage</label>
                     </div>
                    <div className={endCarouseClass}>
                            <MovieCarousel title={carousel.title} posters={carousel.list} enabled={false} />
                    </div>
                    <div className={nextAwClass} onClick={(event) => {this._handleClick()}}>
                        <span><img src="/app/images/down_Arrow_icon.png"/></span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        endCarouselVisible: state.events.endCarouselActive
    };
};


export default connect(mapStateToProps)(MonsterSpecial);