import React from "react";
import { Button } from 'antd';

class Buttons extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }



    render() {
        return (
            <Button
                type="primary"
            > {this.props.name}
            </Button>
        );
    }
    
}
export default Buttons;