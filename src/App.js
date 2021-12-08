import ReactDOM from "react-dom";
import React from "react";
import {Widget} from "./widget/widget";


const e = React.createElement;

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
        <Widget>

        </Widget>
        )
    }
}


const domContainer = document.querySelector("#widget-container");
ReactDOM.render(e(App), domContainer);