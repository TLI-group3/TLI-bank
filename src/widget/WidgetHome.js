import React from "react";
import styles from "./css/widget.module.scss";
import {Button, Input} from "antd";
import Proptypes from 'prop-types';

export default function WidgetHome(props) {
    return (
        <React.Fragment>
            <h2 className={styles.title}>Looking for a new car?</h2>
            <p className={styles.content}>We can help you find affordable cars with the click of a button!</p>
            <form onSubmit={props.addTradeInClicked} className={styles.input}>
                <Input placeholder="Trade-in VIN# (opt)" value={props.tradeIn} onChange={props.handleChange}/>
                <div style={{marginLeft: "2%"}}>
                    <Button className={styles.add} type="default" size="small" htmlType="submit">&#65291;</Button>
                </div>
            </form>
            <Button className={styles.showMe} type="default" size="small"
                    onClick={async() => {await props.findCarsClicked();}}>
                Show my cars
            </Button>
        </React.Fragment>
    );
}

WidgetHome.propTypes = {
    addTradeInClicked: Proptypes.func,
    tradeIn: Proptypes.string,
    handleChange: Proptypes.func,
    findCarsClicked: Proptypes.func,
}
