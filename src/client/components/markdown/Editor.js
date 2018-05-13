import React, {Component} from 'react';
import {MarkdownViewer} from "./Viewer";
import CaptchaButton from "../common/CaptchaButton";
const zlib = require('zlib');
const axios = require('axios');
const config = require('../../../../config');
const initialText = `# Markdown Editor

### Create markdown and share it with others 

## How it works:
* Write your markdown in this text editor, and submit it.
* Copy the shareable URL once it appears on the screen.
* Markdown is deleted permanently when the URL is used **once**.
* Unused markdown is cleaned up every day at 00:00:00 UTC-4:00 (midnight EDT)
* By using this service, you agree to the terms below.

## Terms of Service:
* I assume no responsibility for the content you submit. 
* This is purely experimental. If you need reliable data storage, use another service.
* I will not:
    * Read your content. Full disclosure: I do have the capability of reading it, so don't use this service if you don't trust me.
    * Save your content for more or less time than what's specified in this document.
    * Log any information about any user except for spammers, bots, attackers, and those who break the content policy.
* You will not:
    * Bypass or forge the captcha.
    * Submit more data than this text area is configured to hold.
    * Make an excessive number of submissions. I reserve the right to define what is excessive.
    * Contact any of my backend services except through the user interfaces provided on josh-palmer.com.
    * Use scripts, bots, or any other methods to submit content that don't involve human interaction with this web page in a web browser.
`;

class TextEditor extends Component {

    render() {
        let maxlen = this.props.maxLength ? this.props.maxLength : 2000;
        return (<textarea maxLength={maxlen}
                          rows={this.props.rows}
                          cols={this.props.cols}
                          className="MarkdownEditor"
                          defaultValue={this.props.defaultValue}
                          onChange={this.props.onMarkdownChange}/>);
    }
}

class MarkDownSubmitter extends Component {
    render() {
        return (
            <div className="markdownSubmitter">
                <TextEditor id="mainMarkdownEditor" rows={40} cols={40} defaultValue={this.props.defaultValue} onMarkdownChange={this.props.onMarkdownEnter}/>
                <CaptchaButton buttonText="Submit" onClick={this.props.submitMarkdown} disableWhen={this.props.disableWhen}/>
            </div>
        );
    }
}

class Editor extends Component {
    constructor(props) {
        super(props);
        this.setMarkdownToState = this.setMarkdownToState.bind(this);
        this.setMarkdown = this.setMarkdown.bind(this);
        this.submitMarkdown = this.submitMarkdown.bind(this);
        this.clearMarkdown = this.clearMarkdown.bind(this);
        this.state = {markdown: initialText, url: null};
    }

    static generateUrl(id) {
        return `${window.location.href}/${id}`;
    }

    setMarkdown(text) {
        if(text !== null) {
            this.setState({markdown: text});
        }
    }

    setMarkdownToState (event) {
        let text = event.target.value || "";
        this.setMarkdown(text);
    }

    submitMarkdown (captchaResponse) {
        let self = this;
        zlib.deflate(this.state.markdown, (err, buffer) => {
            if(!err) {
                let compressed = buffer.toString('base64');
                let body = {markdown: compressed, captchaResponse};
                let url = config.aws.submitUrl;
                axios({method: 'post', url: url, data: body}).then(resp => {
                    let purl = Editor.generateUrl(resp.data.postId);
                    self.setState({url: purl});
                }).catch(err => {
                    self.setState({url: null});
                });
            } else {
                self.setState({markdown: 'ERROR', url: null});
            }
        });
    }

    clearMarkdown(e) {
        e.preventDefault();
        this.setMarkdown("");
        document.getElementById('mainMarkdownEditor').innerText = "";
    }

    render() {
        return this.state.url ? (
            <div id="markdownUrlViewer">
                <p>WARNING: This URL expires after ONE use.</p>
                <br/>
                <p>{this.state.url}</p>
                <button onClick={e => {this.setState({url: null})}}>back</button>
            </div>
        ) : (
            <div className="MarkdownArea" id="mainEditor">
                <MarkDownSubmitter onMarkdownEnter={this.setMarkdownToState}
                                   defaultValue={this.state.markdown}
                                   submitMarkdown={this.submitMarkdown}
                                   clearEditor={this.clearMarkdown}
                                   disableWhen={this.state.markdown === initialText}
                />
                <MarkdownViewer id="mainMarkdownViewer" markdown={this.state.markdown}/>
            </div>
        );
    }
}

export default Editor;
