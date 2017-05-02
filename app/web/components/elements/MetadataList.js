import React from 'react';
import _ from 'lodash';

export default class MetadataList extends React.Component {

    static propTypes = {
        list: React.PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="metadata-list">
                <ul>
                    {
                        _.map(this.props.list,
                            function (metadata, index) {
                                return <li key={index}>{metadata}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}