'use strict'

import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

class CategoryList extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
    }

    render() {
        let catListAreaClass = "category-list-area " + this.props.pos;

        return (
            <div className={catListAreaClass}>
                <div className="cat-title-wrap">
                    <label className="cat-title">{this.props.list.title}</label>
                    <span><img src="/app/images/down_Arrow_icon.png"/></span>
                </div>
                <ul className="cat-list">
                    {_.map(this.props.list.items, (item, index) => {
                        return (
                            <li>
                                <label>{item.index}</label>
                                <label>{item.name}</label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};


export default connect(mapStateToProps)(CategoryList);