import React from "react";
import { connect } from "react-redux";

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // componentDidMount() {
    //     this.props.dispatch(());
    // }
    render() {
        return (
            <div className="cell">
                {this.props.x},{this.props.y}
                {this.props.myField}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Cell);
