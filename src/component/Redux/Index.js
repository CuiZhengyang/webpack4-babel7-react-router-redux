import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router"
import {REMOVE_STORE, UPDATE_STORE} from "../../redux/redux";

class About extends React.Component {
    render() {
        let {number1, number2, result, upNumber,array,upArray,removeArrayItem} = this.props;
        // console.log(array)
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
                <br/>
                <div>
                    <div>
                        <a  onClick={()=>upArray(array.length,result)}> remenber result</a><br/>
                        <a onClick={()=>removeArrayItem(['array'])}>clear result</a>
                    </div>
                    <ul>
                        {
                            !!array&&array.map((item,index)=>{
                                return (
                                    <li key={index}>{item.value}  <span> <a onClick={()=>removeArrayItem(['array',index])} > delete</a></span></li>
                                )
                            })
                        }
                    </ul>

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        number1: state.getIn(['number1']),
        number2: state.getIn(['number2']),
        result: state.getIn(['result']),
        array:state.getIn(['array'])
    }
}
const mapDispathToActions = (dispatch) => {
    let upNumber = (number1, number2) => {
        let obj = {
            number1: "",
            number2: "",
            result: "",
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

    let upArray=(key,value)=>{
        let obj = {
            array: [{key,value}]
        }
        dispatch(UPDATE_STORE(obj))
    }

    let removeArrayItem=(keyArray)=>{
        dispatch(REMOVE_STORE(keyArray))
    }

    return {
        upNumber,
        upArray,
        removeArrayItem
    }
}

export default withRouter(connect(mapStateToProps, mapDispathToActions)(About));