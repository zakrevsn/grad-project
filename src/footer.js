import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.newGame = this.newGame.bind(this);
        this.quit = this.quit.bind(this);
    }
    // componentDidMount() {
    //     this.props.dispatch(());
    // }
    render() {
        return (
            <footer className="footer">
                <button className="new-game" onClick={this.newGame}>
                    NEW GAME
                </button>
                <div>
                    <img className="waves" src="/images/sea-waves.png" />
                </div>
                <div>
                    <img className="yellowsub" src="/images/submarine2.png" />
                </div>
                <button className="quit" onClick={this.quit}>
                    QUIT
                </button>
            </footer>
        );
    }

    newGame() {
        console.log("New game");
        socket.emit("newGame");
    }
    quit() {
        console.log("quit");
        window.location.replace("/logout");
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return { myTurn: state.game.myTurn };
}

export default connect(mapStateToProps)(Footer);
