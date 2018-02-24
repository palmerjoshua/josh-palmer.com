import React, { Component } from 'react';

class AboutMe extends Component {
    render() {
        return (
            <div style={{marginLeft: 10}}>
                <main>
                    <h1>Welcome!</h1>
                    <p>Take a look around. There's not much to see yet, but new features are coming soon!</p>
                </main>
                <footer><small>This page was overengineered using ReactJS |
                    <a
                        href="https://github.com/palmerjoshua/josh-palmer.com/blob/master/LICENSE"
                        target="_blank"
                        className="footerLink"> Copyright 2018 Joshua Palmer</a></small></footer>
            </div>
        );
    }
}

export default AboutMe;
