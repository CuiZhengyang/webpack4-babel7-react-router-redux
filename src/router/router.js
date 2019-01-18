import {HashRouter as Router, Route, Switch, Link} from "react-router-dom"
import React from "react";
import {loadable} from "./loadable";

const Index = loadable(import(/* webpackChunkName: 'Index'*/ "../component/Index/Index.js"));
const About = loadable(import(/* webpackChunkName: 'About'*/ "../component/About/Index.js"));
const Users = loadable(import(/* webpackChunkName: 'Users'*/ "../component/Users/Index.js"));



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
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/" exact component={Index}/>
                    <Route  path="/about" component={About}/>
                    <Route  path="/:users" component={Users}/>
                </Switch>
            </React.Fragment>
        </Router>
    )
}