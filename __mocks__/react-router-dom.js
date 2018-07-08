import React, { Component } from 'react';

const rrd = require('react-router-dom');

class MockLink extends Component {
    render() {
        return (
            <a href={this.props.to} style={{display: 'inline-block', height: '100%', width: '90%', padding: 10}}>{this.props.children}</a>
        );
    }
}

rrd.BrowserRouter = ({children}) => <div>{children}</div>;
rrd.Link = MockLink;
module.exports = rrd;
