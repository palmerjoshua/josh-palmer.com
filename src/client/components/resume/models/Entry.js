import React, { Component } from 'react';


class Popup extends Component {
    render() {
        return (
            <div onClick={this.props.popupCtrl}>
                <span>  Opinion: {this.props.opinion}</span>
                {this.props.comment && <br/>}
                {this.props.comment && (
                    <span>Comment: {this.props.comment}</span>
                )}
            </div>
        );
    }
}


class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {popupVisible: false};
        this.togglePopup = this.togglePopup.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    openPopup() {
        if(!this.state.popupVisible) {
            this.setState({popupVisible: true});
        }
    }

    closePopup() {
        if(this.state.popupVisible) {
            this.setState({popupVisible: false});
        }
    }

    togglePopup() {
        this.setState({popupVisible: !this.state.popupVisible});
    }

    render() {
        let entryStyle = {margin: 6, padding: 4, display: 'inline-block'};
        return (
            <div className="Entry" style={entryStyle} onClick={this.togglePopup}>
                <span style={{margin: 6}}>{this.props.title}</span>
                {this.state.popupVisible &&
                <Popup opinion={this.props.opinion}
                       displayState={this.state.popupVisible}
                       popupCtrl={this.closePopup}
                       comment={this.props.comment}
                />}
            </div>

        );
    }
}

export default Entry;
