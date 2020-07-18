import React from "react";
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from "./DonationCheckout";

const App = () => {
  const stripePromise = loadStripe('pk_test_J5l6Y6kODhDxuO75hOEe2qhx');
  return (
    <div style={{display: "block", padding:"50px"}}>
      <h1>Donation Form</h1>
        <Elements stripe={stripePromise}>
          {/* <CheckoutForm stripe={stripePromise}/> */}
        
        <ElementsConsumer>
          {({ elements, stripe }) => (
              <DonationForm elements={elements} stripe={stripe} />
            )}
        </ElementsConsumer>
        </Elements>
    </div>
  );
};
  
  export default App;