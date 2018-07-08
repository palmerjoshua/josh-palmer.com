import React from 'react';
import Footer from '../src/client/components/common/Footer';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Footer><p>first</p><p>second</p></Footer>).toJSON();
    expect(tree).toMatchSnapshot();
});
