import React, {Component} from 'react';
import {MarkdownViewer} from "./Viewer";
import CaptchaButton from "../common/CaptchaButton";
const axios = require('axios');
const config = require('../../../../config');
const initialText = `## Edit me!\n`;


class TextEditor extends Component {
    render() {
        return (<textarea rows={this.props.rows} cols={this.props.cols} className="MarkdownEditor" defaultValue={this.props.defaultValue} onChange={this.props.onMarkdownChange}/>);
    }
}


class MarkDownSubmitter extends Component {
    render() {
        return (
            <div className="markdownSubmitter">
                <TextEditor id="mainMarkdownEditor" rows={40} cols={40} defaultValue={this.props.defaultValue} onMarkdownChange={this.props.onMarkdownEnter}/>
                <CaptchaButton buttonText="Submit" onClick={this.props.submitMarkdown}/>
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
        let text = event.target.value || null;
        this.setMarkdown(text);
    }

    submitMarkdown (captchaResponse) {
        let self = this;
        let sub = config.aws.apiSubdomain;
        let region = config.aws.region;
        let endpoint = config.aws.submitEndpoint;
        let body = {markdown: this.state.markdown, captchaResponse};
        let url = `https://${sub}.execute-api.${region}.amazonaws.com/${endpoint}`;
        axios({method: 'post', url: url, data: body}).then(resp => {
            let purl = Editor.generateUrl(resp.data.postId);
            self.setState({url: purl});
        }).catch(err => {
            self.setState({url: null});
        });
    }

    render() {
        if (this.state.url) {
            return <div id="markdownUrlViewer">
                <p><b>URL: </b>{this.state.url}</p>
                <button onClick={e => {this.setState({url: null})}}>back</button>
            </div>;
        }
        return (
            <div className="MarkdownArea" id="mainEditor">
                <MarkDownSubmitter onMarkdownEnter={this.setMarkdownToState} defaultValue={this.state.markdown} submitMarkdown={this.submitMarkdown}/>
                <MarkdownViewer id="mainMarkdownViewer" markdown={this.state.markdown}/>
            </div>
        );
    }
}

export default Editor;
