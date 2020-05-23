import React from "react";
import {
  Card,
  Col,
  Icon,
  Spin,
  Row,
  Table,
  Typography,
  Button,
  message,
} from "antd";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authAxios } from "../utils";
import {
  addToCartURL,
  orderSummaryURL,
  orderItemDeleteURL,
  orderItemUpdateQuantityURL
} from "../constants";

const { Column, ColumnGroup } = Table;
const { Text } = Typography;

class OrderSummary extends React.Component {
  state = {
    data: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.handleFetchOrder();
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: "You currently do not have an order",
            loading: false
          });
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  renderVariations = orderItem => {
    let text = "";
    orderItem.item_variations.forEach(iv => {
      text += `${iv.variation.name}: ${iv.value}, `;
    });
    return text;
  };

  handleFormatData = itemVariations => {
    // convert [{id: 1},{id: 2}] to [1,2] - they're all variations
    return Object.keys(itemVariations).map(key => {
      return itemVariations[key].id;
    });
  };

  handleAddToCart = (slug, itemVariations) => {
    this.setState({ loading: true });
    const variations = this.handleFormatData(itemVariations);
    authAxios
      .post(addToCartURL, { slug, variations })
      .then(res => {
        this.handleFetchOrder();
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleRemoveQuantityFromCart = slug => {
    authAxios
      .post(orderItemUpdateQuantityURL, { slug })
      .then(res => {
        this.handleFetchOrder();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleRemoveItem = itemID => {
    authAxios
      .delete(orderItemDeleteURL(itemID))
      .then(res => {
        this.handleFetchOrder();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { data, error, loading } = this.state;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    console.log(data);

    return (
      <div>
        <h2>Order Summary</h2>
        {error && (
          message.error(`There was an error: ${error}`)
        )}
        {loading && (
          <Card>
              <Spin>Loading</Spin>

            <img src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Card>
        )}
        {data && (
            <Table dataSource={data.order_items}  
            summary={() => {return (
              <>
              <tr>
                <th>Order Total:</th>
                  <td colSpan={2}>
                    <Text type="danger">${data.order_items.total}</Text>
                  </td>
              </tr>
            </>
            )}}
            footer={() => <Link to="/checkout">
                    <Button floated="right">
                      Checkout
                    </Button>
                  </Link>}>  
                    <Column 
                      title="Item #" 
                      dataIndex="id"
                      key="id"
                    />
                    <Column 
                      title="Item name" 
                      dataIndex="item.title"
                      key="title"
                    />
                    <Column 
                      title="Item price" 
                      dataIndex="item.price"
                      key="price"
                      render={price => (
                      <Text>$ {price}</Text>
                      )}
                    />
                    <Column 
                      title="Item quantity" 
                      dataIndex="quantity"
                      textAlign="center"
                      key="item quantity"
                      render={(quantity, slug) => (
                        <Row>
                          <Col span={8}>
                            <Icon
                            type="minus-square"
                            // style={{ float: "left", cursor: "pointer", display: "block", marginRight: "20px" }}
                            onClick={() =>
                              this.handleRemoveQuantityFromCart(slug)
                            }
                            />
                          </Col>
                          <Col span={8}>
                            {quantity}
                          </Col>
                          <Col span={8}>
                            <Icon
                              type="plus-square"
                              // style={{ float: "right", cursor: "pointer", display: "block", marginLeft: "-20px" }}
                              onClick={() =>
                                this.handleAddToCart(
                                  slug
                                )
                              }
                            />
                        </Col>
                        </Row>
                      )}
                    />
                    <Column 
                      title="Total item price" 
                      dataIndex="final_price"
                      textAlign="right"
                      key="total price"
                      render={final_price => (
                        <Row align="center">
                          <Col span={8}>
                            <Text>${final_price}</Text>
                          </Col>

                          <Col push={12}>
                            <Icon
                              type="delete"
                              // style={{ float: "right", cursor: "pointer" }}
                              onClick={() => this.handleRemoveItem(data.order_items.id)}
                            />
                          </Col>
                        </Row>
                      )}
                    />
            </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(OrderSummary);