import React from 'react';
import renderer from 'react-test-renderer';

import {BrowserRouter} from 'react-router-dom';
import SideBar from '../src/client/components/sidebar/SideBar';


it('renders correctly', () => {
    const tree = renderer.create(<BrowserRouter routes={require('../src/client/routes/Routes')}><SideBar/></BrowserRouter>);
    expect(tree).toMatchSnapshot();
});
