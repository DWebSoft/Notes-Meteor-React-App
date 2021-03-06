import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

import { Notes } from "../api/notes";

export class Editor extends React.Component {
    handleTitleChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        })
    }

    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        });
    }
    
    render() {

        if ( this.props.note ) {
            return (
            <div>
                <input value={this.props.note.title} placeholder="Untitled note" onChange={this.handleTitleChange.bind(this)}/>
                <textarea value={this.props.note.body} placeholder="Your text here" onChange={this.handleBodyChange.bind(this)}></textarea>
                <button>Delete</button>
            </div>
            );
        } else {
            return (<p>
                { this.props.selectedNoteId ? 'Note not found' : 'Pick or create note to get started' }
            </p>)
        }
        
    }
}

Editor.propTypes = {
    selectedNoteId : PropTypes.string,
    note: PropTypes.object
}

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    }
})(Editor);
