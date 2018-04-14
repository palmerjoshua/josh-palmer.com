import React, { Component } from 'react';


class NotFound extends Component {
    render() {
        return (
            <div id="NotFound">
                <h3>Where you goin?</h3>
                <img src={require('../../../../assets/wat.jpg')} alt="WAT"/>
            </div>
        );
    }
}

export default NotFound
