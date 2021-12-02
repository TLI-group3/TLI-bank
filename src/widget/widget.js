import React from "react";
import ReactDOM from "react-dom";
import "./widget.module.scss";
import "antd/dist/antd.css";
import Carousels from "./carousel";
import { Button, Input } from 'antd';


const e = React.createElement;

export class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      carsJSON: [],
      titles: ["Check your cars"],
      descriptions: ["Do you want a new car?"],
      src: [
        "https://www.generatormix.com/images/thumbs/random-car-model-generator.jpg"
      ],
      loading: false,
        inputData: {clientIDs: "1402110922112412", tradeInCar: "2018 Ford Focus"},
        success: false
    };
  }
  sendRequest = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(this.state.inputData)
        };
        fetch('https://cb.caravantage.tech/generateCars',requestOptions)
            // Handle success
            .then(result => {
                this.setState({success: result});
                console.log(this.state.success)
            })
            .catch(err => console.log('Request Failed', err)); // Catch errors
    }

  getCar = () => {
    const requestOptions = {
      method: "GET",
    };

    fetch("https://cb.caravantage.tech/getCars/?input=1402110922112412", requestOptions)
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ carsJSON: json.cars});
          console.log("Car's fetched, loading unto widget")
          console.log(this.state.carsJSON)
        this.loadCar();
      })
      .catch((err) => console.log("Request Failed", err)); // Catch errors
  };


  updateItems = (val) => {
    this.setState({
      items: val
    });
  };

  updateLoaded = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  handleClick =() => {
      console.log("Waiting on cars");
      this.getCar();
      this.updateLoaded();
      this.updateItems(3);
      setTimeout(() => {
          this.updateLoaded();
          console.log("Got cars");
          this.updateItems(5);} , 5000);
  };

  loadCar = () => {
      this.state.carsJSON.map((entry) => {
          return (
              this.state.titles.push(entry.make),
                  this.state.descriptions.push(entry.model + " " + entry.year),
                  this.state.src.push(entry.image)
          );
      });
  }
  render() {
    return (
        <div>

          <Carousels
            count={this.state.items}
            title={this.state.titles}
            description={this.state.descriptions}
            src={this.state.src}
            style={{ width: 100 }}
            loading={this.state.loading}
          />
            <div style={{ margin: "10%" }}>
                <Input placeholder="Trade In Car" />
            </div>
          <div style={{ margin: "10%" }}>
            <Button type="primary" size="small"
                onClick={() => {
                  this.handleClick();
                }}
            >
              Find your Cars!!!
            </Button>
            <Button type="primary"
                onClick={() => {
                  this.updateItems(0);
                  this.sendRequest();
                }}
            >
              Reset
            </Button>
          </div>
        </div>
    );
  }
}

const domContainer = document.querySelector("#widget-container");
ReactDOM.render(e(Widget), domContainer);
