// eslint-ignore-next-line
import React, { Component } from 'react';
import {BrowserRouter, StaticRouter, HashRouter} from 'react-router-dom';
import App from '../components/App.js';

export const GetAppWithRouter = (type = 'browser', url = '/', context = null) => {
    if(type === 'static')
        return <StaticRouter location={url} context={context || {}}><App/></StaticRouter>;
    else if (type === 'browser')
        return <BrowserRouter><App/></BrowserRouter>;
    else if (type === 'hash')
        return <HashRouter><App/></HashRouter>;
    else
        throw `Unknown Router type: ${type}`;
};

export const GetStaticHtml = html => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Josh Palmer</title>
</head>
<body>

    <div id="root">${html}</div>
    <script type="text/javascript" src="main.js"></script></body>
</body>
</html>
`;
};
