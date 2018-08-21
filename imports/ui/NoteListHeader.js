import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";

export const NoteListHeader = (props) => {
    const onClick = () => {
        props.meteorCall('notes.insert')
    };
    return (
        <div>
            <button onClick={onClick} className="button">Create Note</button>
        </div>
    )
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}

export default withTracker(() => {
    return {
        meteorCall: Meteor.call,
    };
})(NoteListHeader);