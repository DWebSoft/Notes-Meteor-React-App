import React from "react";
import { Accounts } from "meteor/accounts-base";
import PropTypes from "prop-types";
import { withTracker } from 'meteor/react-meteor-data'; 

export const PrivateHeader = (props) => {
    return (
            <div className="title-bar">
                <div className="title-bar__content">
                    <h1 className="title-bar__title">{props.title}</h1>
                <button className="button button--link-text" onClick={props.handleLogout}>Logout</button>
                </div>
            </div>    
        );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
}

export default withTracker(() => {
    return {
        handleLogout: () => Accounts.logout()
    }
})(PrivateHeader);