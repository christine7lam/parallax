/**
 *
 * @flow
 */

'use strict'

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import {Movies} from '../../Utils/MoviesDB';
import AutoPlaySection from './sections/AutoPlaySection';
import Selections from './sections/Selections';
import ListEnsambles from './sections/ListEnsambles';
import MonsterSpecial from './sections/MonsterSpecial';
import Grids from './sections/Grids';

class ScrollableContent extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className="scrollable-content">
                <AutoPlaySection/>
                <Selections movies={Movies} enabled={true}/>

                <ListEnsambles/>

                <Selections movies={Movies} enabled={false}/>

                <MonsterSpecial/>
                <Grids/>
            </div>
        )
    }
}

ScrollableContent.propTypes = {
    // posters: PropTypes.Object.isRequired;
};

const mapStateToProps = state => {
    return {
        endCarouselVisible: state.events.endCarouselActive
    };
};


export default connect(mapStateToProps)(ScrollableContent);
