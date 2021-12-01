import React from "react";
import { Card } from "antd";

const { Meta } = Card;
const CustomCard = (props) => {
  return (
    <Card
      cover={<img alt="CarCard" src={props.src} />}
      hoverable={true}
      bordered={false}
      loading={props.loading}
      style={{ width: 300 }}
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
};

export default CustomCard;
