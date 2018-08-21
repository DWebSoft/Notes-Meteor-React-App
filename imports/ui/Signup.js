import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import PropTypes from "prop-types";

import { withTracker } from "meteor/react-meteor-data";

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        //Create a state object
        this.state = {
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        if(password.length < 9) {
            return this.setState({
                error: 'Password must be more than 8 characters long'
            })
        }

        this.props.createUser({email, password}, (err) => {
           if (err) {
               this.setState({
                   error: err.reason
               });
           } else {
               this.setState({
                   error: ''
               });
           }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email"></input>
                        <input type="password" ref="password" name="password" placeholder="Password"></input>
                        <button className="button">Signup</button>
                    </form>
                    <Link to="/">Have an account?</Link>
                </div>    
            </div>
        );
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
}

export default withTracker(() => {
    return {
        createUser: Accounts.createUser
    }
})(Signup);