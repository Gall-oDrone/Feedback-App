import React from "react";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../containers/Checkout";

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_J5l6Y6kODhDxuO75hOEe2qhx');

const MeetingCheckout = (orderID) => {
  return (
    <div style={{display: "block", padding:"50px"}}>
      <h1>Complete your order</h1>
        <Elements stripe={stripePromise}>
          {/* <CheckoutForm stripe={stripePromise}/> */}
        
        <ElementsConsumer>
          {({ elements, stripe }) => (
              <CheckoutForm orderID={orderID} elements={elements} stripe={stripe} />
            )}
        </ElementsConsumer>
        </Elements>
    </div>
  );
};

export default MeetingCheckout;