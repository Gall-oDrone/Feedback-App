import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Layout, Icon, Avatar, Row, Col, Cascader, InputNumber, Divider, Button, Collapse, Popover } from 'antd';
import {createIncentive} from "../store/actions/incentives"
import countryList from 'react-select-country-list'

var moment = require('moment');
const { Meta } = Card;
// const MyPopover = ({ className, ...props }) => <Popover {...props} overlayClassName={className} />
const { Header, Content, Footer, Sider } = Layout;
const options2 = countryList().getData()
const options = [
  {
    value: 'MXN',
    label: 'MXN',
  },
  {
    value: 'USA',
    label: 'USA',
  },
  {
    value: 'CAD',
    label: 'CAD',
  },
  {
    value: 'AUD',
    label: 'AUD',
  },
  {
    value: 'JPY',
    label: 'JPY',
  },
  {
    value: 'GBP',
    label: 'GBP',
  },
  {
    value: 'EUR',
    label: 'EUR',
  },
];

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
      options: options2,
      value: null,
      brand: null,
      amount: 1,
      country: null,
      currency: null
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

    onCardChange = (key, brand) => {
      console.log("key, brand", key, brand);
      this.setState({ brand: key });
    };

    changeHandler = value => {
      this.setState({ value })
    }

    handlerClick() {
      const data = {
        buyer: this.props.username,
        created: moment(),
        incentive_brand: this.state.brand,
        amount: this.state.amount,
        country: this.state.country,
        currency: "1"
      }
      console.log(JSON.stringify(data))
      this.props.postIncentive(this.props.token, data)

    }

    componentDidMount() {
  }
  
  componentWillUnmount() {
      
  }
  
      render() {
        
        console.log("brand: "+JSON.stringify(this.state.brand))
        console.log("amount: "+JSON.stringify(this.state.amount))
        console.log("country: "+JSON.stringify(this.state.country))
        console.log("currency: "+JSON.stringify(this.state.currency))
        let content = (
          <Row type="flex" justify="center">
          <Card style={{ width: 940 }}>
            <div>
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
                <InputNumber onChange={this.onChangeAmount} min={1} max={2000} defaultValue={3} />   
              </div>
              </Col>
              <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
              <div>
                <Button onClick={() =>{this.handlerClick()}} style={{marginTop: "2rem", marginLeft: "-5rem"}}>
                  Buy
                </Button>   
              </div>
              </Col>
            </div>
          </Card>
          </Row>  
        );
        return (
          <div>
            <Row type="flex" justify="center" align="top">
            <Content style={{ padding: '24px 0px 500px 0px' }}>
                <Col span={10}>
                {/* <Popover  content={content} 
                          // overlayStyle={{
                          //   height: "35vh",
                          //   // width: "50vw",
                          //   // left: "79px",
                          //   marginLeft: "40rem",
                          //   marginTop:"30rem"
                          // }} 
                  trigger="click"
                > */}


<Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                <Panel header={
                  <Card
                  key= "AMAZON" onClick={() =>{this.onCardChange("1", this.state.brand)}}
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

                  <p style={{paddingTop: "0px"}}>TITLE</p>
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
                <InputNumber onChange={this.onChangeAmount} min={1} max={2000} defaultValue={3} />   
              </div>
              </Col>
              <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
              <div>
                <Button onClick={() =>{this.handlerClick()}} style={{marginTop: "2rem", marginLeft: "-3rem"}}>
                  Buy
                </Button>   
              </div>
              </Col>
                    </Row>
                </Panel>
              </Collapse>
        

                    {/* <Card
                        key= "AMAZON" onClick={() =>{this.onCardChange("1", this.state.brand)}}
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
                    </Card> */}
                {/* </Popover> */}
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