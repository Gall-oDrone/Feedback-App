import React from "react";
import { CardElement, ElementsConsumer, useElements } from '@stripe/react-stripe-js';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Table, Radio, Spin, message, Divider, Tag, DatePicker, Tab, Icon, Popover, Card } from 'antd';
import OrderPreview from "./OrderPreview";
import SeassionOrderPreview from "./SessionOrderPreview";
import CouponForm from "./CouponForm";
import { authAxios } from "../utils";
import {
  checkoutURL,
  orderSummaryURL,
  sessionOrderSummaryURL,
  addCouponURL,
  addressListURL,
  paymentSURL
} from "../constants";
import "../assets/styleStripe.css";

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

class CheckoutForm extends React.Component {

  state = {
    data: null,
    params: null,
    loading: false,
    error: null,
    success: false,
    shippingAddresses: [],
    billingAddresses: [],
    selectedBillingAddress: "",
    selectedShippingAddress: "",
    isDirectBuying: false,
    order_type: null,
    order_id: null,
    order_key: null
  };

  componentDidMount() {
    this.handleFetchOrder();
    // if(this.props.match !== undefined && Object.keys(this.props.match.params).length > 0){
    //   this.handleFetchParams();
    // } else {
    //   this.handleFetchOrder();
    // }
    this.handleFetchBillingAddresses();
    this.handleFetchShippingAddresses();
    
  }

  handleAddressOptions = addresses => {
    const arr = []
    addresses.map(ad => {
      return arr.push({
        label: ad.text, value: ad.value
      })
    })
    return arr;
  } 

  handleGetDefaultAddress = addresses => {
    const filteredAddresses = addresses.filter(el => el.default === true);
    if (filteredAddresses.length > 0) {
      return filteredAddresses[0].id;
    }
    return "";
  };

  handleFetchBillingAddresses = () => {
    this.setState({ loading: true });
    authAxios
      .get(addressListURL("B"))
      .then(res => {
        this.setState({
          billingAddresses: res.data.map(a => {
            return {
              key: a.id,
              text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
              value: a.id
            };
          }),
          selectedBillingAddress: this.handleGetDefaultAddress(res.data),
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleFetchShippingAddresses = () => {
    this.setState({ loading: true });
    authAxios
      .get(addressListURL("S"))
      .then(res => {
        this.setState({
          shippingAddresses: null,
          // shippingAddresses: res.data.map(a => {
          //   return {
          //     key: a.id,
          //     text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
          //     value: a.id
          //   };
          // }),
          selectedShippingAddress: this.handleGetDefaultAddress(res.data),
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleFetchOrder = () => {
    this.setState({ loading: true });
    var url = null
    console.log("aw:", this.props.orderID, this.props.orderID.orderID)
    if(this.props.orderID.orderID.order_type = "session"){
      url = sessionOrderSummaryURL
    } else {
      url = orderSummaryURL
    }
    let postParams = {params: {
      orderID: this.props.orderID.orderID.order_id
    }}
    authAxios
      .get(url, postParams)
      .then(res => {
        console.log("NI: ", res.data)
        this.setState({ 
                data: res.data, 
                order_type:this.props.orderID.orderID.order_type, 
                order_id:this.props.orderID.orderID.order_id, 
                order_key: this.props.orderID.orderID.order_key,
                loading: false 
              });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.props.history.push("/products");
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  handleFetchParams = () => {
    // this.setState({ loading: true });
    const { data } = this.state;
    if(this.props.match.params !== undefined){
      console.log("80: ", this.props.match.params)
      const { type, brand, amount, country, currency } = this.props.match.params
      const updateData = {
        id: 1,
        coupon: null,
        order_items: [
          {item: {
            category: "Gift Card",
            description: "Amazon Gift Card",
            discount_price: amount,
            id: 1,
            image: "/media/Amazon_Gift_Cards_2.jpg",
            label: "primary",
            price: amount,
            // slug: "GiftCard"​​​​,
            title: brand
          },
          quantity:1,
          final_price:amount,
          id: 1
        }

        ],
        total: amount,
        ...data
      }
      console.log("80: ", updateData)
      this.setState({ loading: false, data: updateData, isDirectBuying: true, params:this.props.match.params });
    } else  {
      this.setState({ loading: false});
    }
  }

  handleAddCoupon = (e, code) => {
    e.preventDefault();
    this.setState({ loading: true });
    authAxios
      .post(addCouponURL, { code })
      .then(res => {
        this.setState({ loading: false });
        this.handleFetchOrder();
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  // handleSelectChange = (e, { name, value }) => {
  handleSelectChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    console.log("TIRA PA DELANTE", this.state.stripe);
    const { stripe, elements } = this.props;
    this.setState({ loading: true, error: null, success:null });
    if (stripe || elements) {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      });

      if (error) {
        console.log('[error]', error);
        this.setState({ error: error.message, loading: false });
      } else {
        console.log('[PaymentMethod]', paymentMethod);
        // this.setState({ error: null });
          const {
            selectedBillingAddress,
            selectedShippingAddress,
            isDirectBuying,
            params,
            order_type,
            order_id,
            order_key
          } = this.state;

          authAxios
            .post(checkoutURL, {
              stripeToken: paymentMethod.id,
              selectedBillingAddress,
              selectedShippingAddress,
              isDirectBuying,
              params,
              order_type,
              order_id,
              order_key
            })
            .then(res => {
              if(res.status == "200"){
                stripe
                  .confirmCardPayment(res.data.client_secret, {
                    payment_method: {
                      card: cardElement,
                      billing_details: {
                        name: 'Jenny Rosen',
                      },
                    },
                  })
                  .then(result => {
                    if (result.error) {
                      // Show error to your customer (e.g., insufficient funds)
                      console.log(result.error.message);
                      this.setState({ loading: false, error: result.error.message });
                    } else {
                      // The payment has been processed!
                      if (result.paymentIntent.status === 'succeeded') {
                        this.setState({ loading: false, success: true });
                        // authAxios
                        // .post(paymentSURL, {
                        //   order_type,
                        //   order_id,
                        // }).then(res => {
                        //   if (res.status === "200") {
                        //     this.setState({ loading: false, success: true });
                        //     // Show a success message to your customer
                        //     // There's a risk of the customer closing the window before callback
                        //     // execution. Set up a webhook or plugin to listen for the
                        //     // payment_intent.succeeded event that handles any business critical
                        //     // post-payment actions.   
                        //   }
                        // })
                      }
                    }
                  });
              }
            })
            .catch(err => {
              console.error("ERROR AT: ", err)
              this.setState({ loading: false, error: err });
            });
      }
    } else {
      console.log("Stripe is not loaded");
    }
  };

  render() {
    const {
      data,
      error,
      loading,
      success,
      order_type,
      billingAddresses,
      shippingAddresses,
      selectedBillingAddress,
      selectedShippingAddress
    } = this.state;
    const { stripe } = this.props;
    console.log("81: ", this.props, this.state)
    return (
      <div>

        {error && (
          message.error(error)
        )}
        {loading && (
          <Spin spinning={loading} />
        )}
        {success && (
          message.success("Your payment was successful"),
          <p>
            Go to your <b>profile</b> to see the order delivery status.
          </p>
        )}
        {order_type !== "session" ? 
          (<OrderPreview data={data} />
          ):(<SeassionOrderPreview data={data}/>
        )}
        <Divider />
        <CouponForm
          handleAddCoupon={(e, code) => this.handleAddCoupon(e, code)}
        />
        <Divider />

        <h3>Select a billing address</h3>
        {billingAddresses.length > 0 ? (
          <Radio.Group
            name="selectedBillingAddress"
            value={selectedBillingAddress}
            // clearable
            options={this.handleAddressOptions(billingAddresses)}
            // selection
            onChange={this.handleSelectChange}
          />
        ) : (
          <p>
            You need to <Link to="/profile">add a billing address</Link>
          </p>
        )}
        {shippingAddresses!== null ? (
          <>
        <h3>Select a shipping address</h3>
        {shippingAddresses.length > 0 ? (
          <Radio.Group
            name="selectedShippingAddress"
            value={selectedShippingAddress}
            // clearable
            options={shippingAddresses}
            // selection
            onChange={this.handleSelectChange}
          />
        ) : (
          <p>
            You need to <Link to="/profile">add a shipping address</Link>
          </p>
        )}
        </>
  ):(null)}
        <Divider />

        <React.Fragment>
        <h3>Would you like to complete the purchase?</h3>
        <form onSubmit={this.submit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
            {/* {success && (
                  message.success("Your payment was successful")
                  <p>
                    Go to your <b>profile</b> to see the order delivery status.
                  </p>
            )} */}
            <Button 
              type="primary"
              onClick={this.submit} 
              loading={loading} 
              disabled={!stripe} 
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
        </form>
        </React.Fragment>
      </div>
    );
  }
}

// const InjectedCheckoutForm = () => {
//   return (
//     <ElementsConsumer>
//       {({ elements, stripe }) => (
//         <CheckoutForm elements={elements} stripe={stripe} />
//       )}
//     </ElementsConsumer>
//   );
// };

export default withRouter(CheckoutForm);

// export default CheckoutForm;

