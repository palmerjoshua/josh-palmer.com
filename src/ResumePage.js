import React, { Component } from 'react';
import rb64 from './resumeb64'
class ResumePage extends Component {

    render () {
        let source = `data:application/pdf;base64,${rb64}`;
        return (
            <main style={{position: 'absolute', left: '12%', width: '100%', height: '95%', display: 'flex', flexDirection: 'column'}}>
                <iframe
                    src={source}
                    style={{width: '60%', height: '100%'}}
                ></iframe>
                <footer style={{flexShrink: 0, color: '#606060'}}>
                    <a className="footerLink" href="/resume/experimental">view interactive resume</a>
                </footer>
            </main>
        );
    }
}

export default ResumePage;
