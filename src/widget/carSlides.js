import React from "react";
import { Card } from "antd";
import styles from "./css/widget.module.scss";

const { Meta } = Card;
const CustomCard = (props) => {
  return (
    <Card
        style={{ top: -9, borderRadius: 12, height: 260 }}
      cover={
        <img alt="CarCard" src={props.src} className={styles.image} />
      }
      hoverable={true}
      bordered={false}
      loading={props.loading}
    >
      <Meta title={props.title} style={{height:30}}/>
        {props.description}
    </Card>
  );
};

export default CustomCard;
