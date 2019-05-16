import React from "react";
import { connect } from "react-redux";

class Endgame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.outcome) {
            return null;
        } else {
            return (
                <div className="popup">
                    <div className="popup-content">{this.props.outcome}</div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return { outcome: state.game.outcome };
}

export default connect(mapStateToProps)(Endgame);
