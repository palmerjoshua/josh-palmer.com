import React from 'react';
import {Route} from 'react-router-dom';
import Welcome from '../components/welcome/Welcome';
import ResumePDF from '../components/resume/ResumePDF';
import Resume from '../components/resume/Resume';
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
        path: '/resume/experimental',
        text: 'Experimental',
        component: Resume
    },
    {
        path: 'http://github.com/palmerjoshua',
        text: 'GitHub'
    },
    {
        path: 'https://www.linkedin.com/in/joshua-palmer-56a345102/',
        text: 'LinkedIn'
    }
];

export default routeConfig;
