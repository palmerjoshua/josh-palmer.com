import React, { Component } from 'react';
import rb64 from './data/resumeb64'

export default class ResumePDF extends Component {
    render () {
        let source = `data:application/pdf;base64,${rb64}`;
        return (
            <div style={{position: 'absolute', width: '100%', height: '95%'}}>
                <iframe style={{width: '60%', height: '100%'}} src={source}></iframe>
            </div>
        );
    }
}
