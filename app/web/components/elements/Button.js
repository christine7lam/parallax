'use strict'

import React from 'react';

export default class Button extends React.Component {

    static propTypes = {
        label: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <label className="button-cta">{this.props.label}</label>
        );
    }
}
