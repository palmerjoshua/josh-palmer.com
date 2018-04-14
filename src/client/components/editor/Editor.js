import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';


const initialText = `# This is a Markdown Editor
## What is this?
* This is a text editor that auto formats what you type.
* All the text you enter stays in your browser and disappears when you leave this page. 

## Why is this here?
* I'm toying with the idea of hosting my own blog here.
* Future plans include:
    * Write blog posts in markdown.
    * Save all posts in some cloud storage, and display them here for visitors to read.
    * Provide a simple markdown editor to conveniently edit and upload blog posts straight from my website. 

Enjoy!

`;


class MarkdownEditor extends Component {
    render() {
        return <textarea id="MarkdownEditor" defaultValue={initialText} onChange={this.props.sendMarkdown}/>;
    }
}


class MarkdownViewer extends Component {
    render() {
        let hasMarkdown = this.props.markdown;
        return <div id="MarkdownViewer">{hasMarkdown && this.props.markdown}</div>;
    }
}


class Editor extends Component {

    constructor(props) {
        super(props);
        this.md = new Remarkable();
        this.md.renderer = new RemarkableReactRenderer();
        this.sendMarkdown = this.sendMarkdown.bind(this);
        this.setMarkdown = this.setMarkdown.bind(this);
        this.state = {rawText: initialText, markdown: this.md.render(initialText)};
    }

    setMarkdown(text) {
        let markdown = text !== null ? this.md.render(text) : null;
        this.setState({markdown: markdown, rawText: text});
    }

    sendMarkdown (event) {
        let text = event.target.value || null;
        this.setMarkdown(text);
    }

    render() {
        return (
            <div id="Editor">
                <MarkdownEditor sendMarkdown={this.sendMarkdown}/>
                <MarkdownViewer markdown={this.state.markdown}/>
            </div>
        );
    }
}

export default Editor;
