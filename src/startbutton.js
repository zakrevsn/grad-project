import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";

class StartButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.startGame = this.startGame.bind(this);
    }
    // componentDidMount() {
    //     this.props.dispatch(());
    // }
    render() {
        if (this.props.myTurn == null) {
            return (
                <button className="start" onClick={this.startGame}>
                    Start
                </button>
            );
        } else {
            return null;
        }
    }

    startGame() {
        console.log("Starting game");
        socket.emit("startGame");
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return { myTurn: state.game.myTurn };
}

export default connect(mapStateToProps)(StartButton);
