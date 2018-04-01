import React, { Component } from 'react';


class NotFound extends Component {
    render() {
        return (
            <div>
                <h3>Where you goin?</h3>
                <img src={require('./wat.jpg')} alt="WAT"/>
            </div>
        );
    }
}

export default NotFound
