import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavItem extends Component {
    render () {
        return (
            <li style={{width: '100%', background: '#f0f0f0', textAlign: 'center'}} className="navItem">
                {this.props.external ?
                    <a
                        href={this.props.path}
                        target="_blank"
                        style={{display: 'block', height: '100%', padding: 10}}
                    >{this.props.text}</a> :
                    <Link to={this.props.path} style={{display: 'block', padding: 10}}>{this.props.text}</Link>}
            </li>
        );
    }
}

class SideBar extends Component {
    render () {
        return (
            <div style={{padding: 10, width: '10%', background: '#606060', display: 'table'}}>
                <ul style={{listStyleType: 'none', padding: 0}}>
                    {this.props.routes.map((route, index) => (
                        <NavItem key={index} path={route.path} text={route.navText} external={route.external}/>
                    ))}
                </ul>
            </div>
        );
    }

}

export default SideBar;
