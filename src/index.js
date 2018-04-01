import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {GetAppWithRouter} from './client/util/helpers';
import './index.css';
ReactDOM.render(
    GetAppWithRouter(),
    document.getElementById('root')
);
