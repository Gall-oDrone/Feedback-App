import React from "react";
import { List, Tag, Ratio } from 'antd';

const Address = (props) => {
    const { data } = props;
    return (
      <React.Fragment>
        {data && (
          <React.Fragment>
              <Header>Select a billing address</Header>
        {billingAddresses.length > 0 ? (
          <Select
            name="selectedBillingAddress"
            value={selectedBillingAddress}
            clearable
            options={billingAddresses}
            selection
            onChange={this.handleSelectChange}
          />
        ) : (
          <p>
            You need to <Link to="/profile">add a billing address</Link>
          </p>
        )}
        <Header>Select a shipping address</Header>
        {shippingAddresses.length > 0 ? (
          <Select
            name="selectedShippingAddress"
            value={selectedShippingAddress}
            clearable
            options={shippingAddresses}
            selection
            onChange={this.handleSelectChange}
          />
        ) : (
          <p>
            You need to <Link to="/profile">add a shipping address</Link>
          </p>
        )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  export default Address;