import React, { Component } from 'react';
import rb64 from './resumeb64'
class ResumePage extends Component {

    render () {
        let source = `data:application/pdf;base64,${rb64}`;
        return (
            <iframe
                src={source}
                style={{width: '60%', height: '90%'}}
            ></iframe>
        );
    }
}

export default ResumePage;
