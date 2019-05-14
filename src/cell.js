import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.placeShip = this.placeShip.bind(this);
        this.shoot = this.shoot.bind(this);
    }
    // componentDidMount() {
    //     this.props.dispatch(());
    // }
    render() {
        return (
            <div
                onClick={this.props.myField ? this.placeShip : this.shoot}
                className="cell"
            >
                {this.props.x},{this.props.y}
                {this.props.myField ? "m" : "e"}
            </div>
        );
    }
    placeShip() {
        socket.emit("placeShip", { x: this.props.x, y: this.props.y });
    }
    shoot() {
        socket.emit("shoot", { x: this.props.x, y: this.props.y });
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Cell);
