import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  Dimmer,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Table,
  Label,
  Loader,
  Menu,
  Message,
  Segment,
  Select
} from "antd";
import {
  countryListURL,
  addressListURL,
  addressCreateURL,
  addressUpdateURL,
  addressDeleteURL,
  userIDURL,
  paymentListURL
} from "../constants";
import { authAxios } from "../utils";

const { Column, ColumnGroup } = Table;
const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

class PaymentHistory extends React.Component {

  state = {
    payments: []
  };

  componentDidMount() {
    this.handleFetchPayments()
  }

  handleFetchPayments = () => {
    this.setState({ loading: true })
    authAxios
      .get(paymentListURL)
      .then(res => {
        this.setState({
          loading: false,
          payments: res.data,
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  render() {
    const { payments } = this.state
    return (
      <Table dataSource={payments} >
        <Column
          title="ID"
          dataIndex="id"
          key="p.id"
        />
        <Column
          title="Amount"
          dataIndex="amount"
          key="p.amount"
        />
        <Column
          title="Date"
          dataIndex="timestamp"
          key="p.timestamp"
          render={(timestamp) => (
              <a>{new Date(timestamp).toUTCString()}</a>
          )}
        />
      </Table>
    );
  }
}

export default PaymentHistory;