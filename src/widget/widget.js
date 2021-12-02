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
        tradeIn: '',
      carsJSON: [],
      titles: ["Check your cars"],
      descriptions: ["Do you want a new car?"],
      src: [
        "https://www.generatormix.com/images/thumbs/random-car-model-generator.jpg"
      ],
      loading: false,
        success: false
    };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleChange(event) {
        this.setState({tradeIn: event.target.value});
    }

    handleSubmit(event) {
        alert('Please wait while we generate the new list with ' + this.state.tradeIn);
        this.sendRequest()
        event.preventDefault();
    }
  //"2018 Ford Focus"
  sendRequest = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({clientIDs: "1402110922112412", tradeInCar: this.state.tradeIn})
        };
        fetch('https://cb.caravantage.tech/generateCars',requestOptions)
            // Handle success
            .then(response => {
                if(!response.ok) {
                    throw new Error("Something went wrong with the request, Status " + response.status);
                } else {
                    alert('Trade in was sent! Please click restart and then Find your Cars!!!');
                    console.log("Trade In sent");
                }

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
    if(val===0){
        this.setState({
            titles: ["Check your cars"],
            descriptions: ["Do you want a new car?"],
            src: [
                "https://www.generatormix.com/images/thumbs/random-car-model-generator.jpg"
            ]
        })
    }
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
          this.updateItems(5);} , 1000);
  };

  loadCar = () => {
      this.state.carsJSON.map((entry) => {
          return (
              this.state.titles.push(entry.make),
                  this.state.descriptions.push(entry.model + " " + entry.year + " For an interest rate of: " + entry.loan.interestRate),
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
            loading={this.state.loading}
          />
            <div style={{ margin: "10%"}}>
                <form onSubmit={this.handleSubmit}>
                <Input placeholder="Trade In Car" value={this.state.tradeIn} onChange={this.handleChange}/>
                    <div style={{margin: "5%"}}>
                    <Button type="default" size="small" htmlType="submit" ghost>Submit</Button>
                    </div>
                </form>
            </div>
          <div style={{ margin: "5%" }}>
            <Button type="default" size="small"
                onClick={() => {
                  this.handleClick();
                }}
                    ghost>
              Find your Cars!!!
            </Button>
              <div style={{margin: "5%"}}>
            <Button type="default"
                onClick={() => {
                  this.updateItems(0);
                }}
                    ghost>
              Reset
            </Button>
              </div>
          </div>
        </div>
    );
  }
}

const domContainer = document.querySelector("#widget-container");
ReactDOM.render(e(Widget), domContainer);
