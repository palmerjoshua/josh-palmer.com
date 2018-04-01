/*
* Add your own routes to `routeConfig`
* External links don't have a `component` property, and the `path` should start with http://
* Rename this file to `config.js`
* */
import React from 'react';
import {Route} from 'react-router-dom';
import Welcome from '../client/components/welcome/Welcome';
import ResumePDF from '../client/components/resume/ResumePDF';

const routeConfig = [
    {
        path: '/',
        text: 'Home',
        component: Welcome
    },
    {
        path: '/resume',
        text: 'Resume',
        component: ResumePDF
    },
    {
        path: 'http://your GitHub URL',
        text: 'GitHub'
    },
    {
        path: 'http://your LinkedIn URL',
        text: 'LinkedIn'
    }
];

export default routeConfig;
