import React from "react";
import { Card } from "antd";
import styles from "./css/widget.module.scss";

const { Meta } = Card;
const CustomCard = (props) => {
  let top = props.src ? -9 : 0;
  let styling = { top: top, borderRadius: 12, height: 260 };
  return (
    <Card
        style={styling}
      cover={props.src &&
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
