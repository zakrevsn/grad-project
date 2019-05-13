import React from "react";
import Cell from "./cell";
import { connect } from "react-redux";

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentDidMount() {
    //     this.props.dispatch(());
    // }
    render() {
        if (!this.props.size) {
            return null;
        }
        let cells = [];
        for (let i = 0; i < this.props.size; i++) {
            for (let j = 0; j < this.props.size; j++) {
                cells.push(
                    <Cell
                        myField={this.props.myField}
                        key={JSON.stringify({ i, j })}
                        x={i}
                        y={j}
                    />
                );
            }
        }
        return <div className="field">{cells}</div>;
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return { size: state.game.size };
}

export default connect(mapStateToProps)(Field);
