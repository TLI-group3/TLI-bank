import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Carousels from "./carousel";
import { Button, Input } from 'antd';
import styles from "./css/widget.module.scss";


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
              titles.push(entry.make);
              descriptions.push(<><div>{entry.model}</div> <div>{entry.year}</div> <div>{`For an interest rate of:`}</div> <div>{entry.loan.interestRate}</div></>);
              src.push(entry.image);
      });
      return{titles:titles, descriptions: descriptions, src: src}
  }
  render() {
      var cars = this.loadCar();
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Looking for a new car?</h2>
            {!this.props.carsJSON && <p className={styles.content}>We can help you find affordable cars with the click of a button!</p>}
            {this.props.carsJSON &&
                <Carousels
                count={this.props.length}
                title={cars.titles}
                description={cars.descriptions}
                src={cars.src}
                loading={this.props.loading}
              />}
            {!this.props.carsJSON && <div style={{ margin: "10%"}}>
                <form onSubmit={this.props.addTradeInClicked}>
                <Input placeholder="TradeIn VIN Number" value={this.state.tradeIn} onChange={this.handleChange}/>
                    <div style={{margin: "5%"}}>
                    <Button type="default" size="small" htmlType="submit" ghost>Add Trade In</Button>
                    </div>
                </form>
            </div>}
          <div style={{ margin: "5%" }}>
              {!this.props.carsJSON && <Button type="default" size="small"
                onClick={async() => {
                  this.props.findCarsClicked();
                }}
                    ghost>
              Show me
            </Button>}
              <div style={{margin: "5%"}}>
                  {this.props.carsJSON &&
                  <Button type="default"
                    onClick={() => {
                        this.props.reset();
                    }}
                        ghost>
                  Reset
                </Button>}
              </div>
          </div>
        </div>
    );
  }
}

