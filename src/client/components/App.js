// eslint-disable-next-line
import React, { Component } from 'react';
import {Switch} from 'react-router-dom';
import routes from './../routes/Routes';
import routeConfig from './../routes/config.js';
import SideBar from './sidebar/SideBar';
import Footer from './common/Footer';

export default class App extends Component {
    render() {
        return (
            <div id={this.constructor.name}>
                <aside style={{width: '120px', position: 'fixed', zIndex: 1}}>
                    <SideBar routes={routeConfig}/>
                </aside>
                <main  style={{marginLeft: '150px'}} id="mainContent">
                    <Switch>
                        {routes}
                    </Switch>
                </main>
                <Footer footerStyle={{marginLeft: '150px', position: 'fixed', bottom: 0, right: 0, left: 0}}>
                    <span>Copyright &#169; 2018 Joshua Palmer</span>
                </Footer>
            </div>
        );
    }
}
