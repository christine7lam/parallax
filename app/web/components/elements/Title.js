'use strict';

import React from 'react';

export default class Title extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="title">
                <span className="txt">{this.props.title}</span>
            </div>
        );
    }
}