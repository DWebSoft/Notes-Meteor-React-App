import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

import { Notes } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";

export const NoteList = (props) => {
    const renderListItems = () => {
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
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    };
})(NoteList);