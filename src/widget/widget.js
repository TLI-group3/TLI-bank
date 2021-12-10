import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Carousels from "./carousel";
import { Button, Input } from 'antd';
import styles from "./css/widget.module.scss";
import WidgetHome from "./WidgetHome";
import Proptypes, {bool} from 'prop-types';


const e = React.createElement;

/**
 * Widget class builds architecture
 */
export class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        tradeIn:'',
    }
      this.handleChange = this.handleChange.bind(this);
  }

    /**
     * Change tradeIn value using the inputted string
     * @param event
     */
    handleChange(event) {
        this.setState({tradeIn: event.target.value});
    }

    /**
     * Loads values from the carsJSON object into separate variables
     * @return {{src: *[], titles: *[], descriptions: *[]}}
     */
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
      titles.push("Interested? Call Us!");
      descriptions.push(<><p>Book an appointment with us to discuss potential car purchases. Dail at +1 (647) XXX-XXXX or book an appointment via your branch.</p></>)
      src.push("");
      return{titles:titles, descriptions: descriptions, src: src}
  }
  render() {
      var cars = this.loadCar();
    return (
        <div>
            {!this.props.carsJSON && <WidgetHome
                addTradeInClicked={this.props.addTradeInClicked}
                tradeIn={this.state.tradeIn}
                handleChange={this.handleChange}
                findCarsClicked={this.props.findCarsClicked}
            />}
            {this.props.carsJSON &&
                <React.Fragment>
                    <Carousels
                        count={this.props.length}
                        title={cars.titles}
                        description={cars.descriptions}
                        src={cars.src}
                        loading={this.props.loading}
                      />
                    <Button className={styles.reset} type="default" onClick={() => {this.props.reset();}}>
                        Reset
                    </Button>
                </React.Fragment>}
        </div>
    );
  }
}
Widget.propTypes = {
    carsJSON: Proptypes.any,
    loading: Proptypes.bool,
    length: Proptypes.number,
    findCarsClicked: Proptypes.func,
    addTradeInClicked: Proptypes.func
}
