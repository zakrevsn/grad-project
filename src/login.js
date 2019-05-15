import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <form id="form" method="post">
                <input
                    id="email"
                    placeholder="email"
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <input
                    id="password"
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                />

                <div id="button-login">
                    <button onClick={this.login} id="login">
                        LOG IN
                    </button>
                </div>
                <div id="error" />
                <Link to="/register">Register</Link>
            </form>
        );
    }
    login(e) {
        ReactDOM.render(<div />, document.querySelector("#error"));
        e.preventDefault();
        console.log("submit");
        console.log(this.state);
        axios
            .post("/login", this.state)
            .then(() => {
                location.replace("/play");
            })
            .catch(res => {
                ReactDOM.render(
                    <div> {res} </div>,
                    document.querySelector("#error")
                );
                console.log(res);
                return "Error message";
            });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}
