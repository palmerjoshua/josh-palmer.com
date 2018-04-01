import React, { Component } from 'react';
import Field from './models/Field.js';
import Config from './data/config.js';
import Footer from '../common/Footer';

class Resume extends Component {
    constructor(props) {
        super(props);
        this.state =  Object.assign({}, Config);
    }
    render() {
        let data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.state))}`;
        return (
            <div id="ResumePlane" style={{position: 'absolute', width: '100%', height: '95%', display: 'flex', flexDirection: 'column'}}>
                {Object.keys(this.state.contents).map((key, idx) => (
                    <Field title={key} entries={this.state.contents[key]} key={idx}/>
                ))}
                <Footer footerStyle={{flexShrink: 0, color: '#606060'}}>
                    <span>version {this.state.version}</span>
                    <a className="footerLink" href={data} download="resume.json">download JSON</a>
                    <a className="footerLink" href='/resume'>view PDF version</a>
                </Footer>
            </div>
        );
    }
}

export default Resume;
