import React from "react";
import { Card } from "antd";
import styles from "./widget.module.scss";

const { Meta } = Card;
const CustomCard = (props) => {
  return (
    <Card
      cover={
        <img alt="CarCard" src={props.src} className={styles.image} />
      }
      hoverable={true}
      bordered={false}
      loading={props.loading}
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
};

export default CustomCard;
