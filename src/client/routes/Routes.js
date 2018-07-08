import React from 'react';
import {Route} from 'react-router-dom';
const routeConfig = require('./config').routes;

export const routeExists = (path) => {
    return routeConfig.some(route => route.path === path);
};

const routes = routeConfig.filter(route => (route.hasOwnProperty('component'))).map((route, idx) => (
    <Route key={idx}
           path={route.path}
           component={route.component}
           exact={route.hasOwnProperty('exact') ? route.exact : true}/>
));

export default routes;
