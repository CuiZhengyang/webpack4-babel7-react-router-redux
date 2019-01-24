import React from 'react';
import "./assets/css/root.css"
import "./assets/css/common.scss"
import "./assets/css/bass.less"
import "./assets/fonts/iconfont.css"
import Root from "./router/router"



export default class APP extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    this is a React Hello World!!
                </div>
                <Root></Root>
            </React.Fragment>
        )
    }
}
