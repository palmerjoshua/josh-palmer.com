import React, {Component} from 'react';
import ReCAPTCHA from 'react-google-recaptcha/lib/recaptcha-wrapper';
const zlib = require('zlib');
const axios = require('axios');
import {MarkdownViewer} from "./Viewer";


const config = require('../../../../config');
const SITE_KEY = config.google.recaptcha.site_key;

const initialText = `
# Secret Messenger
### Create and share self-destructing messages
---
## Directions
1. Click "Edit."
2. Enter text.
3. Prove you're not a robot.
4. Click "Submit."
---
## How it Works
* After you submit, a unique URL is generated.
* Follow this URL to view your message at a later time.
* After one view, your message is gone forever.
* Unread messages are deleted automatically after 30 days.
* If you're feeling fancy, this text editor supports [markdown syntax](https://www.markdownguide.org/cheat-sheet)!
`;



class RecaptchaButton extends Component {
    render() {
        return (
            <span>
                <ReCAPTCHA ref="recaptcha"
                           theme="dark"
                           sitekey={SITE_KEY}
                           onChange={this.props.captchaOnChange}/>
                <button type="button"
                        style={this.props.buttonStyle}
                        onClick={this.props.buttonOnClick}
                        disabled={this.props.buttonDisabled || false}>{this.props.buttonText}</button>
            </span>
        );
    }
}


class EditorView extends Component {
    render() {
        return (
            <div id="editorViewerPane" style={{display: 'flex', minHeight: '100%'}}>

                {this.props.mode === 'edit' &&
                <textarea placeholder={this.props.textPlaceHolder} id="mainMarkdownEditor" style={{order: '1'}}
                          value={this.props.textValue}
                          onChange={this.props.textOnChange}/>}

                {this.props.showViewer() &&
                <MarkdownViewer markdown={this.props.textValue}/>}
            </div>
        );
    }
}


export default class Editor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: initialText,
            mode: 'preview', // or 'edit'
            dual: false,
            captchaResponse: null,
            url: null
        };
        this.toggleMode = this.toggleMode.bind(this);
        this.toggleDual = this.toggleDual.bind(this);
        this.buttonText = this.buttonText.bind(this);
        this.showViewer = this.showViewer.bind(this);
        this.enterText = this.enterText.bind(this);
        this.submitMarkdown = this.submitMarkdown.bind(this);
        this.displayUrl = this.displayUrl.bind(this);
        this.editorIsEmpty = this.editorIsEmpty.bind(this);
    }

    static isFirstToggle(text, mode) {
        return mode === 'edit' && text === initialText;
    }

    toggleMode() {
        let toSet = {mode: this.state.mode === 'edit' ? 'preview' : 'edit'};
        if (Editor.isFirstToggle(this.state.text, toSet.mode)) {
            toSet.text = '';
        }
        this.setState(toSet);
    }

    toggleDual(e) {
        let toSet = {mode: 'edit', dual: !this.state.dual};
        if (Editor.isFirstToggle(this.state.text, toSet.mode)) {
            toSet.text = '';
        }
        this.setState(toSet);
    }

    buttonText() {
        return this.state.mode === 'edit' ? 'Preview' : 'Edit';
    }

    showViewer() {
        return this.state.mode === 'preview' || this.state.dual;
    }

    static generateUrl(id) {
        return `${window.location.href}/${id}`;
    }

    editorIsEmpty() {
        return [undefined, null, ""].indexOf(this.state.text) !== -1
    }

    submitMarkdown () {
        let self = this;
        zlib.deflate(this.state.text, (err, buffer) => {
            if(!err) {
                let compressed = buffer.toString('base64');
                let body = {markdown: compressed, captchaResponse: this.state.captchaResponse};
                let url = config.aws.submitUrl;
                axios({method: 'post', url: url, data: body}).then(resp => {
                    let purl = Editor.generateUrl(resp.data.postId);
                    self.setState({url: purl});
                }).catch(err => {
                    self.setState({url: null});
                });
            } else {
                self.setState({text: 'ERROR', url: null});
            }
        });
    }

    displayUrl() {
        let markdown = `
## WARNING:
* Your content will be deleted permanently after one use, or after 30 days (whichever comes first).
---
## Your URL: 
* ${this.state.url}
`;
        return markdown;
    }

    enterText(e) {
        if (this.state.captchaResponse) {
            this.setState({text: e.target.value, captchaResponse: null});
        } else {
            this.setState({text: e.target.value});
        }
    }

    render() {
        return this.state.url ? (
            <div>
                <MarkdownViewer markdown={this.displayUrl()}/>
                <button type="button" onClick={e=> {this.setState({url: null})}}>back</button>
            </div>
        ) : (
            <div style={{width: '100%', height: '100%'}}>
                <EditorView mode={this.state.mode}
                            textValue={this.state.text}
                            textOnChange={this.enterText}
                            textPlaceHolder={"Type your message here!"}
                            showViewer={this.showViewer}/>

                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: 2}}>
                        <button type="button" style={{width: '8em'}} onClick={this.toggleMode}>{this.buttonText()}</button>
                        <label id="dualController" title="Preview as you type" htmlFor="dualcheck" style={{marginLeft: 2}}>Live Preview: <input name="dualcheck" type="checkbox" checked={this.state.dual} onChange={this.toggleDual}/></label>
                    </div>
                    <RecaptchaButton captchaOnChange={resp => {this.setState({captchaResponse: resp})}}
                                     buttonOnClick={this.submitMarkdown}
                                     buttonStyle={{width: '8em'}}
                                     buttonText={"Submit"} buttonDisabled={this.editorIsEmpty() || this.state.text === initialText}
                    />
                </div>
            </div>
        );
    }
}
