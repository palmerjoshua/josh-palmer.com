import React, {Component} from "react";
import {Redirect, withRouter} from 'react-router-dom';
import Remarkable from 'remarkable';
import RecaptchaButton from '../common/CaptchaButton';
import RemarkableReactRenderer from 'remarkable-react';
const zlib = require('zlib');
const axios = require('axios');
const config = require('../../../../config');

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer();


export class MarkdownViewer extends Component {
    render() {
        let hasMarkdown = ![null, undefined, ''].some(e => e === this.props.markdown);
        let markdown = hasMarkdown ? md.render(this.props.markdown.trim()) : null;
        return <div className="MarkdownViewer">{hasMarkdown && markdown}</div>;
    }
}


class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {markdown: null, error: false};
        this.getMarkdown = this.getMarkdown.bind(this);
    }

    getMarkdown() {
        this.setState({markdown: 'loading...'});
        let postId = this.props.match.params.id;
        let url = config.aws.fetchUrl;
        let body = {postId: postId, captchaResponse: this.state.captchaResponse};
        let self = this;
        axios({method: 'post', url: url, data: body}).then(resp => {
            let compressed = Buffer.from(resp.data.markdown, 'base64');
            zlib.unzip(compressed, (err, buffer) => {
                if (!err) {
                    self.setState({markdown: buffer.toString()});
                } else {
                    self.setState({markdown: '# ERROR\n\nSorry, there was a problem with this request.\nYour markdown is unavailable.'})
                }
            });
        }).catch(err => {
            if (err.response.status === 404) {
                self.setState({markdown: "This page no longer exists."});
            } else if(err.response.status === 400) {
                self.setState({error: true});
            } else {
                let markdown = "## ERROR\n\n```" + JSON.stringify(err) + "```\n";
                self.setState({markdown: markdown});
            }
        });
    }

    render () {
        if(this.state.error)
            return <Redirect to={{pathname: '/wat'}}/>;
        if(this.state.markdown)
            return <div><MarkdownViewer markdown={this.state.markdown}/></div>;

        return (
            <div className="MarkdownViewer">
                <p>To see your message, first prove you're not a robot.</p>
                <RecaptchaButton captchaOnChange={resp => {this.setState({captchaResponse: resp})}}
                                 buttonOnClick={this.getMarkdown}
                                 buttonText={"Fetch Secret Message"}/>
            </div>
        );
    }
}

export default withRouter(Viewer);
