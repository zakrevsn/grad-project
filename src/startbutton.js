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
        if (!this.props.game) {
            return null;
        }
        if (!this.props.game.ready) {
            if (!this.props.message) {
                return (
                    <div>
                        <audio autoPlay={true} loop={true}>
                            <source src="/sounds/waves.mp3" type="audio/mpeg" />
                        </audio>
                        <button className="start" onClick={this.startGame}>
                            Start
                        </button>
                    </div>
                );
            } else {
                return <div className="turn">{this.props.message}</div>;
            }
        } else if (this.props.game.myTurn == null) {
            return <div className="turn">Waiting for other player</div>;
        } else {
            return (
                <div className="turn">
                    {this.props.game.myTurn ? "Your shot" : "Enemy shot"}
                </div>
            );
        }
    }

    startGame() {
        console.log("Starting game");
        socket.emit("startGame");
        let audio = new Audio("/sounds/bell.mp3");
        audio.play();
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return state;
}

export default connect(mapStateToProps)(StartButton);
