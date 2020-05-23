import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import ArticleCustomForm from "../containers/ArticleCreate"
import { List, Button, Skeleton, message, Spin, Collapse, Alert, Switch, Modal, Row, Col, Divider, Cascader, InputNumber, Icon } from 'antd';
import { createIncentive, getDetailIncentiveList } from "../store/actions/incentives";
import Checkout from "./MeetingCheckout";
import countryList from 'react-select-country-list';
import { authAxios } from '../utils';
import { directBuyURL } from "../constants";

var moment = require('moment');
const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 0,
};

const data = [
  {
    title: 'Amazon.com Gift Card',
    image: "https://www.pcgamesupply.com/media/assets/images/MobileGroupImages/Amazon.png",
    loading: false
  },

];
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

const success = () => {
  message.success('Incentive sent');
};

const error = () => {
  message.error('Error while buying incentive');
};

const warning = () => {
  message.warning('This is a warning message');
};

function postData() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve([1, 2, 3]), 1000);
  });
}

class MeetingListIncentives extends React.Component {

  state = {
    initLoading: false,
    loading: false,
    visible: false,
    data: [],
    list: [],
    options: options2,
    participant: null,
    value: null,
    brand: null,
    orderId: null,
    amount: 3,
    country: null,
    currency: null
  };

  toggle = value => {
    this.setState({ loading: value });
  };

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/articles/")
      .then(res => {
        this.setState({
          articles: res.data
        });
      });
  }

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.fetchArticles();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      console.log("componentWillReceiveProps newProps: ")
      console.log(newProps)
      this.fetchArticles();
    }

  }

  handlerClaimedCode = () => {

  }

  handlerParticipants(value, user) {
    var options3 = []
    for (var i in value) {
      if (value[i] != user) {
        options3.push({ value: value[i], label: value[i] })
      }
    }
    return options3
  }

  async postData2() {
    return new Promise(function (resolve) {
      setTimeout(() => resolve([1, 2, 3]), 1000);
    });
  }

  handlerModal = (participantD, amountD, countryD, currencyD, brand) => {
    this.setState({ loading: true });
    const data = {
      buyer: this.props.username,
      recipient: participantD,
      amount: amountD,
      country: countryD,
      currency: currencyD,
      brand: brand,
      created: moment()
    };
    authAxios
    .post(directBuyURL, data)
    .then(res => {
      if(res.status === 200){
        this.setState({ orderId: res.data.order_id, loading: false, visible: true})
      } else {
        this.setState({ loading: false})
      }
    })
    // .catch(err => { error:err})
  }

  handlerBuy = async (participantD, amountD, countryD, currencyD, brand) => {
    this.toggle(true)
    console.log("this.props.error: " + JSON.stringify(this.props.err1))
    console.log("In handlerBuy")
    const data = {
      buyer: this.props.username,
      recipient: participantD,
      amount: amountD,
      country: countryD,
      currency: currencyD,
      brand: brand,
      created: moment()
    }
    this.props.createIncentive(this.props.token, data)
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

  onChangeBrand = (key, brand) => {
    console.log("key, brand", key, brand);
    this.setState({ brand: key });
  };

  onChangeParticipant = value => {
    console.log('Participant changed', value);
    this.setState({ participant: value[0] })
  }

  onChangeCurrency = value => {
    console.log('Currency changed', value);
    this.setState({ currency: value[0] })
  }

  onChangeCountry = value => {
    console.log('Country changed', value);
    this.setState({ country: value[0] })
  }

  onChangeAmount = value => {
    console.log('Amount changed', value);
    this.setState({ amount: value })
  }

  // onLoadMore = () => {
  //   this.setState({
  //     loading: true,
  //     list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
  //   });
  //   this.getData(res => {
  //     const data = this.state.data.concat(res.results);
  //     this.setState(
  //       {
  //         data,
  //         list: data,
  //         loading: false,
  //       },
  //       () => {
  //         // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
  //         // In real scene, you can using public method of react-virtualized:
  //         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
  //         window.dispatchEvent(new Event('resize'));
  //       },
  //     );
  //   });
  // };

  render() {
    console.log("this.props " + this.props)
    console.log("this.state " + this.state.country)

    const { initLoading, participant, loading, amount, country, orderId, brand, currency, visible } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <div>
      {visible === true ? (
        <Modal  
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Checkout orderID={orderId}/>
        </Modal>
      ):(null)}

      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        // onClick={this.onChangeBrand("Amazon.com Gift Card", brand)}
      >
        <Panel header={
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={data}
            renderItem={item => (
              <List.Item >
                <img width={72} alt="logo" src={item.image} />
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<a href="https://ant.design" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{item.title}</a>}
                    description="Amount:$3 - $2000"
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-center', marginLeft: 30 }}
                  />
                </Skeleton>
              </List.Item>
            )}
          >
          </List>
        } key="1" style={customPanelStyle}>
          <div>
            <Spin spinning={this.state.loading}>
              <p style={{ paddingTop: "0px" }}>TITLE</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="DESCRIPTION" content={"CONTENT"} />
                </Col>
              </Row>
              <Divider />
              <Row>
                {this.props.roomDetails.RoomDetail !== undefined ? (
                  <Col xs={{ span: 4, offset: 1 }} lg={{ span: 4, offset: 2 }}>
                    <h3>Participant</h3>
                    <div>
                      <Cascader options={this.handlerParticipants(this.props.roomDetails.RoomDetail.participants, this.props.username)} onChange={this.onChangeParticipant} placeholder="Please select" />
                    </div>
                  </Col>
                ) : (null)}
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
              </Row>
              <Row type="flex" justify="center">
                <Col >
                  <div>
                    <Button 
                      type="primary"
                      onClick={() => {this.handlerModal(participant, amount, country, currency, "Amazon Gift Card")}}
                      loading={loading} 
                      disabled={
                        visible || 
                        (participant &&
                        amount &&
                        country &&
                        currency) == null} 
                      style={{ marginTop: "10px" }}
                    > 
                    {/* </div>this.handlerBuy(participant, amount, country, currency, "Amazon.com Gift Card") }} style={{ marginTop: "2rem" }}> */}
                      Buy Now!
                    </Button>
                  </div>
                </Col>
              </Row>
            </Spin>
          </div>
        </Panel>
      </Collapse>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("mapStateToProps: " + JSON.stringify(state))
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.incentives.loading,
    err1: state.incentives.error,
    roomDetails: state.roomDetail
  };
};

const mapDispatchToProps = dispatch => {
  console.log("mapDispatchToProps: ")
  return {
    createIncentive: (token, data) => dispatch(createIncentive(token, data)),
    getUserIncentiveList: (token, userID, data) => dispatch(getDetailIncentiveList(token, userID, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingListIncentives);