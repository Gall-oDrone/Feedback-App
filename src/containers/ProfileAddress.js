import React from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Tabs,
  Table,
  Spin,
  Layout,
  Tag,
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
import AddressForm from "./AddressForm"

const { Content, Sider } = Layout;
const { TabPane } = Tabs;
const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";
const { Meta } = Card;

class Profile extends React.Component {
  state = {
    activeItem: "billingAddress",
    addresses: [],
    countries: [],
    userID: null,
    selectedAddress: null
  };

  componentDidMount() {
    this.handleFetchAddresses();
    this.handleFetchCountries();
    this.handleFetchUserID();
  }

  handleItemClick = name => {
    this.setState({ activeItem: name }, () => {
      this.handleFetchAddresses();
    });
  };

  handleGetActiveItem = () => {
    const { activeItem } = this.state;
    if (activeItem === "billingAddress") {
      return "Billing Address"
    } else if (activeItem === "shippingAddress") {
      return "Shipping Address"
    }
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

  handleDeleteAddress = addressID => {
    authAxios
      .delete(addressDeleteURL(addressID))
      .then(res => {
        this.handleCallback();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleSelectAddress = address => {
    this.setState({ selectedAddress: address });
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

  handleFetchCountries = () => {
    authAxios
      .get(countryListURL)
      .then(res => {
        this.setState({ countries: this.handleFormatCountries(res.data) });
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

  handleCallback = () => {
    this.handleFetchAddresses();
    this.setState({ selectedAddress: null });
  };

  renderAddresses = () => {
    const {
      activeItem,
      addresses,
      countries,
      selectedAddress,
      userID
    } = this.state;
    return (
      <React.Fragment>
        
        <Card>
          {addresses.map(a => {
            return (
              <div>
              <h3 className="site-card-demo-inner-p">{a.street_address}, {a.apartment_address}</h3>
              <Card 
                type="inner" 
                title={a.country} 
                key={a.id}
                actions={[
                  <Button
                    color="yellow"
                    onClick={() => this.handleSelectAddress(a)}
                  >
                    Update
                  </Button>,
                  <Button
                    color="red"
                    onClick={() => this.handleDeleteAddress(a.id)}
                  >
                    Delete
                  </Button>
                ]}
              >
                  {a.default && (
                    <Tag as="a" color="blue" ribbon="right">
                      Default
                    </Tag>
                  )}
                  <Meta description={a.zip}>{a.country}</Meta>
              </Card>
              </div>
            );
          })}
        </Card>
        {addresses.length > 0 ? <Divider /> : null}
        {selectedAddress === null ? (
          <AddressForm
            activeItem={activeItem}
            countries={countries}
            formType={CREATE_FORM}
            userID={userID}
            callback={this.handleCallback}
          />
        ) : null}
        {selectedAddress && (
          <AddressForm
            activeItem={activeItem}
            userID={userID}
            countries={countries}
            address={selectedAddress}
            formType={UPDATE_FORM}
            callback={this.handleCallback}
          />
        )}
      </React.Fragment>
    );
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
          <Col>
          <Content style={{ padding: '0px' }}>
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Tabs defaultActiveKey={this.state.defaultKey} tabPosition="left" style={{ marginRight: "90rem",width:900}}>
                <TabPane 
                  active={activeItem === "billingAddress"} 
                  onClick={() => this.handleItemClick("billingAddress")} 
                  key={"1"} 
                        tab={
                            <span>
                              Billing Address
                            </span>
                        }
                  >
                     <h3>Billing Address</h3>
                    {this.renderAddresses()}
                </TabPane>
                <TabPane 
                  active={activeItem === "shippingAddress"}
                  onClick={() => this.handleItemClick("shippingAddress")}
                  key={"2"} 
                        tab={
                            <span>
                              Shipping Address
                            </span>
                        }
                >
                  <h3>Shipping Address</h3>
                  {this.renderAddresses()}
                </TabPane>
            </Tabs>
            </Layout>
            </Content>
          </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Profile);