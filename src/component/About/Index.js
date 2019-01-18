import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router"
import {UPDATE_STORE} from "../../redux/redux";

class About extends React.Component {
    render() {
        let {number1, number2, result, upNumber} = this.props;
        return (
            <React.Fragment>
                <h2>在这里我们将告诉你如何react+router+redux</h2>
                <div>
                    <input type="text" value={number1} onChange={(e) => {
                        let val = e.target.value;
                        upNumber(val, number2)
                    }}/><br/>
                    <span>+</span><br/>
                    <input type="text" value={number2} onChange={(e) => {
                        let val = e.target.value;
                        upNumber(number1, val)
                    }}/><br/>
                    <span>=</span><br/>
                    <input type="text" value={result} readOnly/>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        number1: state.number1,
        number2: state.number2,
        result: state.result
    }
}
const mapDispathToActions = (dispatch) => {
    let upNumber = (number1, number2) => {
        let obj = {
            number1: "",
            number2: "",
            result: ""
        }, reg = /^-?\d+$/;

        if (reg.test(number1)) {
            obj.number1 = number1;
        }
        if (reg.test(number2)) {
            obj.number2 = number2;
        }
        if (reg.test(number1) && reg.test(number2)) {
            obj.result = parseFloat(number1) + parseFloat(number2)
        }
        dispatch(UPDATE_STORE(obj))
    }

    return {
        upNumber
    }
}

export default withRouter(connect(mapStateToProps, mapDispathToActions)(About));