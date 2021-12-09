import ReactDOM from "react-dom";
import React from "react";
import {Widget} from "./widget/widget";
import {CarClient} from "./DataAccess/CarClient";


const e = React.createElement;

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.client = new CarClient('https://cb.caravantage.tech');
        this.state ={
            carsJSON: [],
            loading: false,
            items:0
        }
    }
    addTradeInClicked = (event) =>{
        this.client.sendRequest(event.target.value, "1402110922112412")
        event.preventDefault();

};
    findCarsClicked = async() => {
        var cars = this.client.getCars();
        this.setState({loading: true, items: 0});
        var carsJson = await cars;
        this.setState({carsJSON: carsJson});
        setTimeout(() => {
            this.setState({loading:false, items: 5});
            console.log("Got cars");} , 1000);

    };

    updateLength = (length) => {
        this.setState({items: length})
    }

    render(){
        console.log(this.state.carsJSON)
        return(
        <Widget
        findCarsClicked = {this.findCarsClicked}
        addTradeInClicked ={this.addTradeInClicked}
        updateLength ={this.updateLength}
        carsJSON = {this.state.carsJSON}
        loading = {this.state.loading}
        length ={this.state.items}>
        </Widget>
        )
    }
}


const domContainer = document.querySelector("#widget-container");
ReactDOM.render(e(App), domContainer);