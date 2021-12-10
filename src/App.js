import ReactDOM from "react-dom";
import React from "react";
import {Widget} from "./widget/widget";
import {CarClient} from "./DataAccess/CarClient";


const e = React.createElement;

/**
 * App Class, handles button clicks, connects DataAccess to Widget
 */
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.client = new CarClient('https://cb.caravantage.tech');
        this.state ={
            carsJSON: null,
            loading: false,
            items:0
        }
    }

    /**
     * Makes trade in request using sendRequest() from CarClient
     * assigns event as the parameter of sendRequest()
     * @param event
     */

    addTradeInClicked = (event) =>{
        this.client.sendRequest(event.target.value, "1402110922112412")
        event.preventDefault();
    };
    /**
     * Retrieves carList using getCars() from CarClient
     * In case fetching takes long, changes loading state to animate cards.
     * @async
     * @return {Promise<void>}
     */

    findCarsClicked = async() => {
        var cars = this.client.getCars();
        this.setState({loading: true, items: 0});
        var carsJson = await cars;
        this.setState({carsJSON: carsJson});
        this.setState({loading:false, items: 5});
        console.log("Got cars");};

    /**
     * Changes state of items to given length
     * @param {int} length
     */
    updateLength = (length) => {
        this.setState({items: length})
    }

    /**
     * Changes state of items to 0 and empties carsJSON
     */
    reset = () => {
        this.updateLength(0);
        this.setState({carsJSON: null});
    }

    render(){
        console.log(this.state.carsJSON)
        return(
        <Widget
        findCarsClicked = {this.findCarsClicked}
        addTradeInClicked ={this.addTradeInClicked}
        reset ={this.reset}
        carsJSON = {this.state.carsJSON}
        loading = {this.state.loading}
        length ={this.state.items}>
        </Widget>
        )
    }
}


const domContainer = document.querySelector("#widget-container");
ReactDOM.render(e(App), domContainer);