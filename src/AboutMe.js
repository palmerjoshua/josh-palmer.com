import React, { Component } from 'react';

class AboutMe extends Component {
    render() {
        return (
            <div style={{width: '80%'}}>
                <h1>About Me</h1>
                <p>My name is Joshua Palmer, and this is my personal website. For now it's mainly an extended resume,
                    with the goal of detailing and demonstrating my experience in software engineering.
                    If I can emphasize one thing about my experience thus far, it's that I am adaptable. I don't
                    consider myself a "jack of all trades," but I do learn quickly and effectively. As a young
                    software engineer, I've had to learn quite a bit while simultaneously producing a usable and
                    valuable product. I always welcome new challenges, and I'm always trying to learn new things.</p>
                <h2>Python</h2>
                <ul>
                    <li>Python is my favorite language and my "bread and butter." Most of what I do at work is written
                        in Python. When I "think in code," my thoughts are in Python.
                    </li>
                    <li>Some things I've written in Python include:
                        <ul>
                            <li>one-off scripts to do specific tasks</li>
                            <li>Reddit bots, and other bots to do automated tasks</li>
                            <li>REST API using the Flask framework</li>
                        </ul>
                    </li>
                </ul>
                <h2>Web Programming</h2>
                <ul>
                    <li>I have made websites and web apps in a variety of ways, including:
                        <ul>
                            <li>static HTML and pure Javascript</li>
                            <li>static HTML and jQuery</li>
                            <li>HTML and PHP (I prefer never to do this again)</li>
                            <li>AngularJS v1 (Primarily at work)</li>
                            <li>ReactJS (I am still learning, but I am comfortable with it. This site is written in
                                React, for example.)
                            </li>
                        </ul>
                    </li>
                    <li>At work I write and maintain a REST API written in Python, which is consumed by the Angular app
                        mentioned above.
                    </li>
                    <li>While I am comfortable with CSS, I prefer to use either minimalist designs or frameworks like
                        Bootstrap. I am a programmer, not a designer. If I had to choose between making a web app "look
                        nice" and making it work, I'd choose the latter any day.
                    </li>
                </ul>
            </div>
        );
    }
}

export default AboutMe;
