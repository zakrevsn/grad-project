import React from "react";
import { connect } from "react-redux";
import { socket } from "./socket";
const legend = [
    // sample ships;
    [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 4, y: 2 },
        { x: 5, y: 2 },
        { x: 6, y: 2 },
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 6, y: 4 },
        { x: 7, y: 4 },
        { x: 0, y: 6 },
        { x: 2, y: 6 },
        { x: 4, y: 6 },
        { x: 6, y: 6 },
        { x: 8, y: 6 }
    ]
];
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
        if (!this.props.myField && this.props.myTurn == null) {
            let ship = false;
            for (let i in legend) {
                for (let j in legend[i]) {
                    if (
                        this.props.x == legend[i][j].x &&
                        this.props.y == legend[i][j].y
                    ) {
                        ship = true;
                    }
                }
            }
            return <div className={"cell" + (ship ? " ship" : "")} />;
        }
        if (this.props.myField) {
            let ship = false;
            for (let i in this.props.ships) {
                for (let j in this.props.ships[i]) {
                    if (
                        this.props.x == this.props.ships[i][j].x &&
                        this.props.y == this.props.ships[i][j].y
                    ) {
                        ship = true;
                    }
                }
            }
            return (
                <div
                    onClick={this.props.myTurn == null ? this.placeShip : null}
                    className={"cell" + (ship ? " ship" : "")}
                />
            );
        } else {
            let shot = false;
            let hit = false;
            for (let i in this.props.myShots) {
                if (
                    this.props.x == this.props.myShots[i].x &&
                    this.props.y == this.props.myShots[i].y
                ) {
                    shot = true;
                    hit = this.props.myShots[i].hit;
                }
            }
            return (
                <div
                    onClick={this.shoot}
                    className={
                        "cell" + (shot ? " shot" : "") + (hit ? " hit" : "")
                    }
                />
            );
        }
    }
    placeShip() {
        socket.emit("placeShip", { x: this.props.x, y: this.props.y });
    }
    shoot() {
        socket.emit("shoot", { x: this.props.x, y: this.props.y });
    }
}

function mapStateToProps(state) {
    if (!state || !state.game) {
        return {};
    }
    return state.game;
}

export default connect(mapStateToProps)(Cell);
