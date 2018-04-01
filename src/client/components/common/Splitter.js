import React, { Component } from 'react';

export default class Splitter extends Component {
    render() {
        let delimiter = ' | ';
        return (this.props.small) ? <small>{delimiter}</small> : <span>{delimiter}</span>;
    }
}