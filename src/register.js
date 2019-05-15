import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <form id="form" method="post">
                <input
                    id="name"
                    placeholder="name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
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

                <div id="button">
                    <button onClick={this.register} id="registerbot">
                        REGISTER
                    </button>
                </div>
                <div id="error" />
                <Link to="/">Log in</Link>
            </form>
        );
    }
    register(e) {
        ReactDOM.render(<div />, document.querySelector("#error"));
        e.preventDefault();
        console.log("submit");
        console.log(this.state);
        axios
            .post("/register", this.state)
            .then(() => {
                this.props.history.push("/");
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
