import {HashRouter as Router, Route, Switch, Link} from "react-router-dom"
import React from "react";
import {loadable} from "./loadable";

const Index = loadable(import(/* webpackChunkName: 'Index'*/ "../component/Index/Index.js"));
const ReduxDemo = loadable(import(/* webpackChunkName: 'Redux'*/ "../component/Redux/Index.js"));
const RouterDemo = loadable(import(/* webpackChunkName: 'Router'*/ "../component/Router/Index.js"));



export default function Root() {
    return (
        <Router>
            <React.Fragment>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/redux">react+react-router+redux</Link>
                        </li>
                        <li>
                            <Link to="/router">react+react-router</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/" exact component={Index}/>
                    <Route  path="/redux" component={ReduxDemo}/>
                    <Route  path="/router" component={RouterDemo}/>
                </Switch>
            </React.Fragment>
        </Router>
    )
}