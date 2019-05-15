import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentDidMount() {
    //     this.props.dispatch(());
    // }
    render() {
        return (
            <header className="header">
                <h1 className="site-header">BATTLESHIP</h1>
                <div className="sub-header">
                    <div className="ships-container">
                        <img
                            className="battleship"
                            src="/images/battleship2.png"
                        />
                        <img
                            className="periscope"
                            src="/images/periscope.png"
                        />
                        <img
                            className="cargoship"
                            src="/images/cargo-ship--v1.png"
                        />
                        <div className="containerfortwo">
                            <img
                                className="albatross"
                                src="images/albatross.png"
                            />
                            <img
                                className="lighthouse"
                                src="images/lighthouse--v3.png"
                            />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return { myTurn: state.game.myTurn };
}

export default connect(mapStateToProps)(Header);
