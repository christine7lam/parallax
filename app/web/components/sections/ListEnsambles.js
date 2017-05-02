'use strict'

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

import CategoryList from '../elements/CategoryList';

class ListEnsambles extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        let listLeft =
            {
                title: 'Upcoming Releases',
                items: [
                        {index: 1, name: 'Spider-Man Homecoming'},
                        {index: 2, name: 'Get Out'},
                        {index: 3, name: 'Kong: Skull Island'},
                        {index: 4, name: 'Manchester by the Sea'},
                        {index: 5, name: 'Guardians of the Galaxy 2'}
                ]
            };

        let listRight =
            {
                title: 'Top 30',
                items: [
                    {index: 1, name: 'Spider-Man Homecoming'},
                    {index: 2, name: 'Get Out'},
                    {index: 3, name: 'Kong: Skull Island'},
                    {index: 4, name: 'Manchester by the Sea'},
                    {index: 5, name: 'Guardians of the Galaxy 2'}
                ]
            };


        return (
            <div className="list-ensambles-section">
                <div className="list-wrap">
                    <CategoryList list={listLeft} pos="left"/>
                    <CategoryList list={listRight} pos="right"/>
                </div>
                <div className="ensambles-wrap">
                    <label>ENSAMBLES</label>
                    <div className="ensambles-content">
                        <img src="/app/images/misc/Ensamble 1.png"/>
                        <ul>
                            <li>
                                <img src="/app/images/misc/Ensamble 2.png"/>
                            </li>
                            <li>
                                <img src="/app/images/misc/Ensamble 3.png"/>
                            </li>
                            <li>
                                <img src="/app/images/misc/Ensamble 4.png"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};


export default connect(mapStateToProps)(ListEnsambles);