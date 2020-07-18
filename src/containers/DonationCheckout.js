import React from "react";
import axios from "axios";
import { CardElement, ElementsConsumer, useElements } from '@stripe/react-stripe-js';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Result, Table, Radio, Spin, message, Divider, InputNumber } from 'antd';
import { authAxios } from "../utils";
import {
  donationURL,
  addressListURL
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
    project_id: "1",
    billingAddresses: [],
    selectedBillingAddress: "",
    input_number: 5,
    order_type: null,
    order_id: null,
    order_key: null
  };

  componentDidMount() {
    if(this.props.token !== null && this.props.token !== undefined){
      this.handleFetchBillingAddresses();
    }
  }

  onAmountChange(value) {
    this.setState({input_number:value})
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
        console.log("ASC",err)
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
            input_number,
            project_id,
            // order_type,
            // order_id,
            // order_key
          } = this.state;

          axios
            .post(donationURL, {
              stripeToken: paymentMethod.id,
              selectedBillingAddress,
              input_number,
              project_id,
              // order_type,
              // order_id,
              // order_key,
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
      error,
      loading,
      success,
      billingAddresses,
      selectedBillingAddress,
      input_number
    } = this.state;
    const { stripe } = this.props;
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
          <Result
          status="success"
          title="Successfully Donatated To Project"/>
        )}

        <Divider />
        <h3>Input Amount</h3>
        <div>
            <InputNumber
              defaultValue={input_number}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              size="small"
              min={1}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={this.onAmountChange.bind(this)}
            />          
        </div>
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

        <Divider />

        <React.Fragment>
        <h3>Would you like to complete the payment?</h3>
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

const mapStateToProps = state => {
  console.log("JSON.stringify(state): " + JSON.stringify(state))
  return {
    username: state.auth.username,
    token: state.auth.token,
  }
}

export default withRouter(connect(mapStateToProps)(CheckoutForm));

// export default CheckoutForm;

