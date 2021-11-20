import React from "react";
import ReactDOM from "react-dom";
import "./widget.module.scss";
import "antd/dist/antd.css";
import Carousels from "./carousel";

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
      ]
    };
  }
  //componentDidMount() {
  // this.getCars();
  //}

  getCars = () => {
    const params = "1402110922112412";
    const requestOptions = {
      method: "POST",
      body: params
    };
    fetch("https://cb.caravantage.tech/cars", requestOptions)
      // Handle success
      .then((response) => response.json()) // convert to json
      .then((json) => {
        this.setState({ carsJSON: json.cars });
      })
      .catch((err) => console.log("Request Failed", err)); // Catch errors
  };

  update = (val) => {
    this.setState({
      items: val
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.carsJSON.map((entry) => {
            return (
              this.state.titles.push(entry.make),
              this.state.descriptions.push(entry.model + " " + entry.year),
              this.state.src.push(entry.image)
            );
          })}
          ;
          <Carousels
            count={this.state.items}
            title={this.state.titles}
            description={this.state.descriptions}
            src={this.state.src}
            style={{ width: 100 }}
          />
        </div>
        <div style={{ margin: "10%" }}>
          <button
            onClick={() => {
              this.update(0);
              this.getCars();
              this.update(5);
            }}
          >
            Find your Cars!!!
          </button>
          <button
            onClick={() => {
              this.update(0);
            }}
          >
            Reset
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const domContainer = document.querySelector("#widget-container");
ReactDOM.render(e(Widget), domContainer);
