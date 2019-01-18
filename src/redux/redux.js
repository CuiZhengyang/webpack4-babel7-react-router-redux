import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk"

let middleWare = [thunk]

const UPDATE_STORE_STATE = "updatestorestate"


export const UPDATE_STORE = (param) => {
    return {
        type: UPDATE_STORE_STATE,
        param
    }
}


let initstate = {
    number1: 0,
    number2: 0,
    result: 0
}

function counter(state = initstate, action) {
    switch (action.type) {

        case UPDATE_STORE_STATE:
            return Object.assign({}, state, action.param)
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