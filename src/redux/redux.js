import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk"

let middleWare = [thunk]

const UPDATE_STORE_STATE = "updatestorestate";
const REMOVE_STORE_BY_KEY="removestorebykey";


export const UPDATE_STORE = (param) => {
    return {
        type: UPDATE_STORE_STATE,
        param
    }
}

export const REMOVE_STORE=( keyArray)=>{
    return {
        type: REMOVE_STORE_BY_KEY,
        param:keyArray
    }
}


let initstate = {
    number1: 0,
    number2: 0,
    result: 0,
}

function getMergeImmutableObj(oldState,updateParam) {
    return Object.assign({},oldState,updateParam)
}



function counter(state = initstate, action) {
    switch (action.type) {

        case UPDATE_STORE_STATE:
            return getMergeImmutableObj(state,action.param);
        default:
            return state
    }
}

let store;

if (process.env.NODE_ENV == "development")
    store = createStore(counter, composeWithDevTools(
        applyMiddleware(...middleWare)
    ))
else
    store = createStore(counter, applyMiddleware(...middleWare))

export default store;