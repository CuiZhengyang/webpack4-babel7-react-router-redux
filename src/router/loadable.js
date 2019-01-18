import Loadable from 'react-loadable';
import React from "react";

const Loading=(props)=>{
    if (props.error) {
        console.log(props.error)
        return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}


export const loadable=(component)=>{
    return Loadable({
        loader: () => component,
        loading: Loading,
    });
}