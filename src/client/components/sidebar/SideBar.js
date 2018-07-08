import React, { Component } from 'react';
import Navigator from './Navigator';

class SideBar extends Component {
    render() {
        return (
            <aside className="sideBar">
                <Navigator/>
            </aside>
        );
    }
}

export default SideBar;
