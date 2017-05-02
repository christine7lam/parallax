'use strict'

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

class Grids extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        let rowOne = [
            {index: 0, src: '/app/images/misc/Genre_Action.png'},
            {index: 1, src: '/app/images/misc/Genre_Comedy.png'},
            {index: 2, src: '/app/images/misc/Genre_Drama.png'}
        ]

        let rowTwo = [
            {index: 0, src: '/app/images/misc/Genre_Adventure.png'},
            {index: 1, src: '/app/images/misc/Genre_Documentary.png'},
            {index: 2, src: '/app/images/misc/Genre_SciFi.png'}
        ]

        let rowThree = [
            {index: 0, src: '/app/images/misc/Genre_Kids.png'},
            {index: 1, src: '/app/images/misc/Genre_Animals.png'},
            {index: 2, src: '/app/images/misc/Genre_Horror.png'}
        ]

        let grids = [rowOne, rowTwo, rowThree];

        let gridClass = (this.props.parallaxIndex === 8) ? 'grids-wrap fade-in' : 'grids-wrap';

        return (
            <div className={gridClass}>
                {
                    _.map(grids, (row, index) => {
                        return (
                            <ul className="grid-content">
                                {
                                    _.map(row, (poster, index) => {
                                        return (
                                            <li>
                                                <img src={poster.src}/>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        )
                    })
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        parallaxIndex: state.events.parallaxIndex
    };
};


export default connect(mapStateToProps)(Grids);