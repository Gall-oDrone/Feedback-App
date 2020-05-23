import React from "react";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Cascader,
  Dimmer,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Input,
  Table,
  Label,
  Loader,
  Menu,
  message,
  Segment,
  Select
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

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";
const { Option } = Select;

class AddressForm extends React.Component {
  state = {
    error: null,
    loading: false,
    formData: {
      address_type: "",
      apartment_address: "",
      country: "",
      default: false,
      id: "",
      street_address: "",
      user: 1,
      zip: ""
    },
    saving: false,
    success: false
  };

  componentDidMount() {
    const { address, formType } = this.props;
    if (formType === UPDATE_FORM) {
      this.setState({ formData: address });
    }
  }

  handleToggleDefault = () => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
      default: !formData.default
    };
    this.setState({
      formData: updatedFormdata
    });
  };

  handleChange = e => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
      [e.target.name]: e.target.value
    };
    this.setState({
      formData: updatedFormdata
    });
  };

  handleSelectChange = (e, { name, value }) => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
      [name]: value
    };
    this.setState({
      formData: updatedFormdata
    });
  };

  handleSubmit = e => {
    this.setState({ saving: true });
    e.preventDefault();
    const { formType } = this.props;
    this.props.form.validateFields((err, values) => {
      const street_address =
        values["street_address"] === undefined ? null : values["street_address"];
      const apartment_address =
        values["apartment_address"] === undefined ? null : values["apartment_address"];
      const country =
        values["country"] === undefined ? null : values["country"];
      const zip =
        values["zip"] === undefined ? null : values["zip"];
      const defaultA = 
        values["default"] === undefined ? null : values["default"];
      const postObj = {
        street_address: values.street_address,
        apartment_address: values.apartment_address,
        country: values.country,
        zip: values.zip,
        defaultA: values.defaultA
      }
      console.log("YALEG: ", postObj.defaultA)
      if (!err) {
        if (formType === UPDATE_FORM) {
          console.log("Y: ")
          this.handleUpdateAddress(postObj);
        } else {
          console.log("N: ")
          this.handleCreateAddress(postObj);
        }
      }
    })
  };

  handleCreateAddress = (pObj) => {
    const { userID, activeItem } = this.props;
    const { formData } = this.state;
    console.log("formData EG: ",formData)
    console.log("pObj: ",pObj)
    authAxios
      .post(addressCreateURL, {
        ...pObj,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S"
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
        this.props.callback();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleUpdateAddress = (pObj) => {
    const { userID, activeItem } = this.props;
    const { formData } = this.state;
    console.log("fortitnitnitnmData EG: ",formData)
    console.log("pObj: ",pObj)
    authAxios
      .put(addressUpdateURL(formData.id), {
        ...pObj,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S"
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
          formData: { default: false }
        });
        this.props.callback();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  render() {
    const { countries } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { error, formData, success, saving } = this.state;
    console.log("THIS STATE: ", this.state);
    return (
      
      <Form onSubmit={this.handleSubmit} success={success} error={error}>
         {success && (
          message.success("Your address was saved")
        )}
        {error && (
        message.error(`There was an error: ${JSON.stringify(error)}`)
        )}
        <Form.Item
          label="Street address"
          // rules={[{ required: true, message: 'Please input your Street address!' }]}
          // required
          // name="street_address"
          // placeholder="Street address"
          // value={formData.street_address}
        >
          {getFieldDecorator('street_address', {
            initialValue: formData.street_address,
            rules: [
              { required: true, message: 'Please input your Street address!' },
            ],
          })( <Input  onChange={this.handleChange} placeholder="Please input your Street Address" /> )}
        </Form.Item>
        <Form.Item
          label="Apartment address"
          // required
          // name="apartment_address"
          // placeholder="Apartment address"
          // onChange={this.handleChange}
          // value={formData.apartment_address}
        >
          {getFieldDecorator('apartment_address', {
            initialValue: formData.apartment_address,
            rules: [
              { required: true, message: 'Please input your Apartment address!' },
            ],
          })( <Input  onChange={this.handleChange} placeholder="Please input your Apartment Address" /> )}
        </Form.Item>
        <Form.Item 
          label="Country"
        // required
        >
          {getFieldDecorator('country', {
            initialValue: formData.country,
            rules: [
              { required: true, message: 'Please input your Country!' },
            ],
          })( 
            <Select
              loading={countries.length < 1}
              fluid
              clearable
              search
              options={countries}
              name="country"
              placeholder="Country"
              onChange={this.handleSelectChange}
              // defaultValue={formData.country}
              // value={formData.country}
            >
                {countries.map(c => (
                  <Option key={c.value}>{c.text}</Option>
                ))}
            </Select>
           )}
        </Form.Item>
        <Form.Item
          label="Zip Code"
          // required
          // name="zip"
          // placeholder="Zip code"
          // onChange={this.handleChange}
          // value={formData.zip}
        >
          {getFieldDecorator('zip', {
            initialValue: formData.zip,
            rules: [
              { required: true, message: 'Please input your zip!' },
            ],
          })( <Input  onChange={this.handleChange} placeholder="Zip code" /> )}
        </Form.Item>
        <Form.Item
          // name="default"
          label="Make this the default address?"
        >
          {getFieldDecorator('defaultA', {
            initialValue: formData.defaultA,
            rules: [
              { required: false, message: 'Please select!' },
            ],
          })( 
            <Checkbox 
              onChange={this.handleToggleDefault}
              checked={formData.defaultA}
            />
           )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" disabled={saving} loading={saving} type="primary">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedAddressForm = Form.create({ name: "validate_other" })(AddressForm);

export default WrappedAddressForm;