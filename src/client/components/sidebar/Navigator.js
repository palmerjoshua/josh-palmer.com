import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import routeConfig from '../../routes/config';

class NavItem extends Component {
    render () {
        let linkStyle = {display: 'inline-block', height: '100%', width: '90%', padding: 10};
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

export default class Navigator extends Component {
    render () {
        return (
            <nav className="Navigator">
                <ul style={{listStyleType: 'none', padding: 0}}>
                    {routeConfig.routes.filter((route) => !route.hide).map((route, index) => (
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
