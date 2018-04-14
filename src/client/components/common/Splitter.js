import React, { Component } from 'react';

export default class Splitter extends Component {
    render() {
        let delimiter = ' | ';
        return (this.props.small) ? <small className="Splitter">{delimiter}</small> : <span className="Splitter">{delimiter}</span>;
    }
}
