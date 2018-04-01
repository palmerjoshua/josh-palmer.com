// eslint-disable-next-line
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class NotFoundRedirect extends Component {
    render() {
        return <Redirect to={{pathname: '/wat'}}/>;
    }
}

export default NotFoundRedirect;
