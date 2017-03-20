import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SideBar from './SideBar';
import ResumePage from './ResumePage';
import AboutMe from './AboutMe';

const routes = [
    {path: '/', navText: 'Home', exact: true, external: false, component: AboutMe},
    {path: '/resume', navText: 'Resume', exact: true, external: false, component: ResumePage},
    {path: 'https://www.linkedin.com/in/joshua-palmer-56a345102/', navText: 'LinkedIn', external: true},
    {path: 'https://github.com/palmerjoshua', navText: 'GitHub', external: true}
];

class App extends Component {
    render() {
        let navRoutes = routes.map((route) => {
            return {path: route.path, navText: route.navText, external: route.external};
        });
        return (
            <Router>
                <div style={{display: 'flex', height: '100%'}}>
                    <SideBar routes={navRoutes}/>
                    <div style={{paddingLeft: 10, paddingRight: 10, width: '100%', height: '100%'}}>
                        {routes.map((route, index) => (
                            !route.external &&
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}/>
                        ))}
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
