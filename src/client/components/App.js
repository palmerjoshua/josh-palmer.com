// eslint-disable-next-line
import React, { Component } from 'react';
import {Switch} from 'react-router-dom';
import routes from './../routes/Routes';
import SideBar from './sidebar/SideBar';
import Footer from './common/Footer';


class MainContent extends Component {
    render() {

        return (
            <main id="mainContent">
                <Switch>
                    {routes}
                </Switch>
            </main>
        );
    }
}

export default class App extends Component {
    render() {
        return (
            <div  id="App">
                <SideBar/>
                <MainContent/>
                <Footer id="mainFooter" footerStyle={{zIndex: -1, order: 3, position: 'fixed', bottom: 0, right: 0, left: 8}}>
                    <span>Copyright &#169; 2018 Joshua Palmer</span>
                </Footer>
            </div>
        );
    }
}
