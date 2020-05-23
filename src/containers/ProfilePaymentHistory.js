import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Table,
  Spin,
  Menu,
  message,
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
import PaymentHistory from "./PaymentHistory"

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";

class Profile extends React.Component {
  state = {
    activeItem: "paymentHistory",
    addresses: [],
    countries: [],
    userID: null,
    selectedAddress: null
  };

  componentDidMount() {
    this.handleFetchUserID();
  }

  handleItemClick = name => {
    this.setState({ activeItem: name }, () => {
      this.handleFetchAddresses();
    });
  };

  handleGetActiveItem = () => {
    const { activeItem } = this.state;
    return "Payment History"
  };

  handleFormatCountries = countries => {
    const keys = Object.keys(countries);
    return keys.map(k => {
      return {
        key: k,
        text: countries[k],
        value: k
      };
    });
  };

  handleFetchUserID = () => {
    authAxios
      .get(userIDURL)
      .then(res => {
        this.setState({ userID: res.data.userID });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleFetchAddresses = () => {
    this.setState({ loading: true });
    const { activeItem } = this.state;
    authAxios
      .get(addressListURL(activeItem === "billingAddress" ? "B" : "S"))
      .then(res => {
        this.setState({ addresses: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const {
      activeItem,
      error,
      loading,
    } = this.state;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <Row>
          <Col>
            {error && (
              message.error(`There was an error: ${JSON.stringify(error)}`)
            )}
            {loading && (
              <div>
                  <Spin>Loading</Spin>
                <img src="/images/wireframe/short-paragraph.png" />
              </div>
            )}
          </Col>
          {/* <Col width={6}>
            <Menu>
              <Menu.Item
                name="Payment history"
                active={activeItem === "paymentHistory"}
                onClick={() => this.handleItemClick("paymentHistory")}
              >
                <h3>Payment History</h3>
              </Menu.Item>
            </Menu>
          </Col> */}
          <Col width={10}>
            <h3>Payment History</h3>
            <Divider />
            {activeItem === "paymentHistory" ? (
              <PaymentHistory />
            ) : (
                null
              )}
          </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state
  };
};

export default connect(mapStateToProps)(Profile);