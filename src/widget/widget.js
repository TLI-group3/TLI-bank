import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Carousels from "./carousel";
import { Button, Input } from 'antd';
import styles from "./css/widget.module.scss";
import WidgetHome from "./WidgetHome";


const e = React.createElement;

export class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        tradeIn:'',
    }
      this.handleChange = this.handleChange.bind(this);
  }
    handleChange(event) {
        this.setState({tradeIn: event.target.value});
    }


  loadCar = () => {
      var titles= [];
      var descriptions= [];
      var src= [];
      this.props.carsJSON?.map((entry) => {
                var number= Math.floor(parseInt(entry.loan.loanAmount)/parseInt(entry.loan.loanTerm));
                let make = entry.make.charAt(0).toUpperCase() + entry.make.slice(1);
                let model = entry.model.charAt(0).toUpperCase() + entry.model.slice(1);
                let carName = entry.year + " " + make + " " + model;
              titles.push(carName);
              descriptions.push(<><p>For only ${number.toLocaleString()} per month, you can afford a {carName}! With an interest rate of {entry.loan.interestRate}%</p></>);
              src.push(entry.image);
      });
      return{titles:titles, descriptions: descriptions, src: src}
  }
  render() {
      var cars = this.loadCar();
    return (
        <div className={styles.container}>
            {!this.props.carsJSON && <WidgetHome
                addTradeInClicked={this.props.addTradeInClicked}
                tradeIn={this.state.tradeIn}
                handleChange={this.handleChange}
                findCarsClicked={this.props.findCarsClicked}
            />}
            {this.props.carsJSON &&
                <Carousels
                count={this.props.length}
                title={cars.titles}
                description={cars.descriptions}
                src={cars.src}
                loading={this.props.loading}
              />}
            {this.props.carsJSON &&
                  <Button type="default"
                    onClick={() => {
                        this.props.reset();
                    }}
                        ghost>
                  Reset
                </Button>}
        </div>
    );
  }
}

