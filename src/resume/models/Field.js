import React, { Component } from 'react';
import Entry from './Entry.js';

class Field extends Component {
    render() {
           let entryBgColor = 'white';
        return (
            <div className='ResumeField'>
                <h1>{this.props.title}</h1>
                {this.props.entries.map((entry, idx) => (
                    <Entry key={`${entry.title}${idx}`}
                           color={entryBgColor}
                           title={entry.title}
                           opinion={entry.opinion}
                           comment={entry.comment}
                    />
                ))}
            </div>
        );
    }
}

export default Field;
