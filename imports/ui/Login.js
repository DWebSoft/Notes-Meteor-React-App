import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";

import { withTracker } from "meteor/react-meteor-data";

export class Login extends React.Component {
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

        this.props.loginWithPassword({email}, password, (err) => {
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
                    <h1>Login</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email"></input>
                        <input type="password" ref="password" name="password" placeholder="Password"></input>
                        <button className="button">Login</button>
                    </form>
                    <Link to="/signup">Don't have an account?</Link>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
}

//Containerized Container
export default withTracker(() => {
    return {
        loginWithPassword: Meteor.loginWithPassword,
    }
})(Login);