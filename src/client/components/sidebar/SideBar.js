import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavItem extends Component {
    render () {
        let linkStyle = {display: 'block', height: '100%', padding: 10};
        return (
            <li className="navItem">
                {this.props.external
                    ? <a href={this.props.path}
                         target="_blank"
                         style={linkStyle}>{this.props.text}</a>
                    : <Link to={this.props.path}
                            style={linkStyle}>{this.props.text}</Link>
                }
            </li>
        );
    }
}

export default class SideBar extends Component {
    render () {
        return (
            <nav  style={{width: '100%'}} className="sideBar">
                <ul style={{listStyleType: 'none', padding: 0}}>
                    {this.props.routes.filter((route) => !route.hide).map((route, index) => (
                        <NavItem key={index}
                                 path={route.path}
                                 text={route.text}
                                 external={!route.hasOwnProperty('component')}/>
                    ))}
                </ul>
            </nav>
        );
    }
}
