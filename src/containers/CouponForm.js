import React, { Component } from "react";
import {
    Form,
    Button,
  } from "antd";

class CouponForm extends Component {
    state = {
      code: ""
    };
  
    handleChange = e => {
      this.setState({
        code: e.target.value
      });
    };
  
    handleSubmit = e => {
      const { code } = this.state;
      this.props.handleAddCoupon(e, code);
      this.setState({ code: "" });
    };
  
    render() {
      const { code } = this.state;
      return (
        <React.Fragment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              <h4>Coupon code</h4>
              <div/>
              <input
                placeholder="Enter a coupon.."
                value={code}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Button type="submit">Redeem</Button>
          </Form>
        </React.Fragment>
      );
    }
  }

  export default CouponForm;