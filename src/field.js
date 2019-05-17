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
        let caption = null;
        if (this.props.myTurn == null) {
            if (this.props.myField) {
                caption = "Place your ships";
            } else {
                caption = "Legend";
            }
        }
        return (
            <div className="field-container">
                <div className="field-caption">{caption}</div>
                <div className="field">
                    <div />
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>a</div>
                    <div>b</div>
                    <div>c</div>
                    <div>d</div>
                    <div>e</div>
                    <div>f</div>
                    <div>g</div>
                    <div>h</div>
                    <div>i</div>
                    <div>j</div>
                    <div className="cells-container">{cells}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return { size: state.game.size, myTurn: state.game.myTurn };
}

export default connect(mapStateToProps)(Field);
