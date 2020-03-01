import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Layout, Icon, message, Avatar, Row, Col, Cascader, InputNumber, Divider, Button, Collapse, Popover } from 'antd';
import {createIncentive} from "../store/actions/incentives"
import countryList from 'react-select-country-list'

var moment = require('moment');
const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;
const options2 = countryList().getData()
const options = [
  // {
  //   value: 'MXN',
  //   label: 'MXN',
  // },
  {
    value: 'USD',
    label: 'USD',
  },
  // {
  //   value: 'CAD',
  //   label: 'CAD',
  // },
  // {
  //   value: 'AUD',
  //   label: 'AUD',
  // },
  // {
  //   value: 'JPY',
  //   label: 'JPY',
  // },
  // {
  //   value: 'GBP',
  //   label: 'GBP',
  // },
  // {
  //   value: 'EUR',
  //   label: 'EUR',
  // },
];

const success = () => {
  message.success('Incentive sucessfully bought');
};

const error = () => {
  message.error('Error while buying incentive');
};

const warning = () => {
  message.warning('This is a warning message');
};

const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
  marginRight: -230,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class Incentives extends React.Component {
  
    state = {
      initLoading: false,
      loading: false,
      options: options2,
      value: null,
      brand: null,
      amount: 3,
      country: null,
      currency: null
    };

    toggle = value => {
      this.setState({ loading: value });
    };

    onChange(value){
      console.log('changed', value);
    }
    onChangeCurrency = value => {
      console.log('Currency changed', value);
      this.setState({ currency: value[0] })
    }

    onChangeCountry = value => {
      console.log('Country changed', value);
      this.setState({ country: value[0] })
    }

    onChangeAmount = value =>{
      console.log('Amount changed', value);
      this.setState({ amount: value })
    }

    onChangeBrand = (key, brand) => {
      console.log("key, brand", key, brand);
      this.setState({ brand: key });
    };

    changeHandler = value => {
      this.setState({ value })
    }

    componentDidMount() {
  }
  
  componentWillUnmount() {
      
  }

  async postData2() {
    return new Promise(function (resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
  }
  
  handlerBuy = async (amountD, countryD, currencyD, brand) => {
    this.toggle(true)
    console.log("this.props.error: " + JSON.stringify(this.props.err1))
    console.log("In handlerBuy")
    const data = {
      buyer: this.props.username,
      amount: amountD,
      country: countryD,
      currency: currencyD,
      incentive_brand: brand,
      created: moment()
    }
    this.props.postIncentive(this.props.token, data)
    console.log("POSTING")
    this.postData2().then(() => {
      if (this.props.err1 !== null) {
        error()
      } else {
        success()
      }
      this.toggle(false)
    });
  }
  
      render() {
        const { initLoading, brand, loading, amount, country, currency } = this.state;
        return (
          <div>
            <Row type="flex" justify="center" align="top">
            <Content style={{ padding: '24px 0px 500px 0px' }}>
                <Col span={10} onClick={() =>{this.onChangeBrand("1", brand)}}>
              <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel header={
                  <Card
                  key= "AMAZON"
                  style={{ width: 300 }}
                  cover={
                  <img
                      alt="example"
                      src="https://www.pcgamesupply.com/media/assets/images/MobileGroupImages/Amazon.png"
                  />
                  }
              >
                  <Meta
                  title="Amazon.com Gift Card"
                  description="Amount:$0.01 - $2000"
                  />
              </Card>
                } key="1" style={customPanelStyle}>

                  <p style={{paddingTop: "0px"}}>AMAZON GIFT CARD</p>
                    <Row>
                      <Col span={12}>
                        <DescriptionItem title="DESCRIPTION" content={"CONTENT"} />
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
                        <h3>Currency</h3>
                        <div>
                          <Cascader options={options} onChange={this.onChangeCurrency} placeholder="Please select" />
                        </div>
                        </Col>
                        <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
                        <h3>Country</h3>
                        <div>
                          <Cascader options={options2} onChange={this.onChangeCountry} placeholder="Please select" />
                        </div>
                        </Col>
                        <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
                        <h3>Amount</h3>
                        <div>
                          <InputNumber onChange={this.onChangeAmount} min={1} max={2000} defaultValue={amount} />   
                        </div>
                        </Col>
                        <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
                        <div>
                          <Button onClick={() => { this.handlerBuy(amount, country, currency, "1", brand) }} style={{marginTop: "2rem", marginLeft: "-3rem"}}>
                            Buy
                          </Button>   
                        </div>
                      </Col>
                    </Row>
                </Panel>
              </Collapse>
            </Col>
          </Content>
        </Row>
          </div>
             )
    }
  } 
  
  const mapStateToProps = state => {
    console.log(JSON.stringify(state))
    return {
      token: state.auth.token,
      username: state.auth.username,
      incentives: state.auth.incentives,
      err1: state.incentives.error,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      postIncentive: (token, data) => dispatch(createIncentive(token, data)),
      // getASNTS: token => dispatch(actions.getASNTS(token))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Incentives);