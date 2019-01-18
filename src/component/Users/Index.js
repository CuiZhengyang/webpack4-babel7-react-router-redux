import React from "react"
import {withRouter} from "react-router"

 class Users extends React.Component {

    componentDidMount(){
        let {history}=this.props;
        this.unlisten = history.listen((location, action) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            );
            console.log(`The last navigation action was ${action}`);
        });
    }
    componentWillUnmount(){
        this.unlisten();
    }
    render() {
        let {history}=this.props;

        return (
            <React.Fragment>
                <h2>这个模块告诉你如何仅使用react+react-router</h2>
                <a onClick={()=>{
                    history.push("/")
                }}>  去首页</a>
            </React.Fragment>
        );
    }

}
export default withRouter(Users)