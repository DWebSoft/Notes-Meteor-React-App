import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Session } from "meteor/session";

import { Notes } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export const NoteList = (props) => {
    const renderListItems = () => {
        if (props.notes.length == 0 ) {
            return <NoteListEmptyItem/>;
        }
        return props.notes.map((note) => {
            return <NoteListItem key={note._id} note={note}/>
        });
    }
    return (
        <div>
            <NoteListHeader/>
            {renderListItems()}
            NoteList { props.notes.length }
        </div>    
    );
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch().map((note) => {
            return {
                ...note,
                selected: selectedNoteId === note._id
            }
        })
    };
})(NoteList);