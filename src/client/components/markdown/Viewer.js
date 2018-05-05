import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
const axios = require('axios');
const config = require('../../../../config');

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer();


export class MarkdownViewer extends Component {
    render() {
        let hasMarkdown = ![null, undefined, ''].some(e => e === this.props.markdown);
        let markdown = hasMarkdown ? md.render(this.props.markdown) : null;
        return <div className="MarkdownViewer">{hasMarkdown && markdown}</div>;
    }
}


class Viewer extends Component {
    constructor(props) {
        super(props);
        this.state = {markdown: 'loading...'};
    }

    componentDidMount() {
        let postId = this.props.match.params.id;
        let sub = config.aws.apiSubdomain;
        let region = config.aws.region;
        let endpoint = config.aws.fetchEndpoint;
        let url = `https://${sub}.execute-api.${region}.amazonaws.com/${endpoint}`;
        let body = {postId: postId};
        let self = this;
        axios({method: 'post', url: url, data: body}).then(resp => {
            self.setState({markdown: resp.data.markdown});
        }).catch(err => {
            let markdown = "## ERROR\n\n```" + JSON.stringify(err) + "```\n";
            self.setState({markdown: markdown});
        });
    }

    render () {
        return (
            <div>
                <MarkdownViewer markdown={this.state.markdown}/>
            </div>
        );
    }
}

export default withRouter(Viewer);
