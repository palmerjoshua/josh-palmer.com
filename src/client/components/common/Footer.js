import React, { Component } from 'react';
import Splitter from './Splitter';

export default class Footer extends Component {
    static makeSmall(item) {
        return (
            <small>{item}</small>
        );
    }

    static makeFooterItem(item, useDelimiter) {
        let key = `footeritem${Math.random().toString(36).substring(7)}`;
        return (
            <span key={key}>
                {Footer.makeSmall(item)}
                {useDelimiter && <Splitter small={true}/>}
            </span>
        );
    }

    render() {
        let children = this.props.children;
        if (!Array.isArray(children))
            children = [children];
        return (
            <footer className="Footer" style={this.props.footerStyle}>
                    {children.map((child, i, arr) => (Footer.makeFooterItem(child, i < arr.length-1)))}
            </footer>
        );
    }
}
