import React, { Component } from 'react';
import Field from './models/Field.js';
import Config from './config/resumeConfig.js';


class Resume extends Component {
    constructor(props) {
        super(props);

        this.state =  Object.assign({}, Config)
    }
    render() {
        let data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.state))}`;
        return (
            <main id="ResumePlane" style={{position: 'absolute', left: '12%', width: '100%', height: '95%', display: 'flex', flexDirection: 'column'}}>
                {Object.keys(this.state.contents).map((key, idx) => (
                    <Field title={key} entries={this.state.contents[key]} key={idx}/>
                ))}
                <footer style={{flexShrink: 0, color: '#606060'}}>
                    <small>
                        version {this.state.version} |
                        <a className="footerLink" href={data} download="resume.json"> download JSON</a> |
                        <a className="footerLink" href='/resume'> view PDF version</a>
                    </small>
                </footer>
            </main>
         );
    }
}

export default Resume;
