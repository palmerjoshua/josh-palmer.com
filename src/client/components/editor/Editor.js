import React, { Component } from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

const initialText = `# This is a Markdown Editor
## What is this?
* This is a text editor that [auto formats](https://www.markdownguide.org/cheat-sheet) what you type.
* All the text you enter stays in your browser and disappears when you leave this page. 

## Why is this here?
* I don't know. Why not?

Enjoy!

`;


class MarkdownEditor extends Component {
    render() {
        return (<textarea className="MarkdownEditor" defaultValue={this.props.defaultValue} onChange={this.props.sendMarkdown}/>);
    }
}


class MarkdownViewer extends Component {
    render() {
        let hasMarkdown = this.props.markdown;
        return <div className="MarkdownViewer">{hasMarkdown && this.props.markdown}</div>;
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
            <div className="Editor" id="mainEditor">
                <MarkdownEditor id="mainMarkdownEditor" sendMarkdown={this.sendMarkdown} defaultValue={initialText}/>
                <MarkdownViewer id="mainMarkdownViewer" markdown={this.state.markdown}/>
            </div>
        );
    }
}

export default Editor;
