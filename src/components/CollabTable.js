import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Menu, Card, Button, DatePicker, TimePicker, Form, Modal, Skeleton, message, Divider, List, Tabs, Row, Col, Icon} from "antd";
import { Link, withRouter } from "react-router-dom";
import Checkout from "../components/MeetingCheckout";
import {getProfileAccountInfo, putProfileAccountInfo} from "../store/actions/profileUserInfo";
import {profilePageURL, profileFollowUser} from "../constants"
import MessengerBox from "../components/MessengerBox";
import "../assets/session.css";
import "../assets/collaboration.css";
import countryList from 'react-select-country-list';

class CollabTable extends React.Component {

    render() {
        return (
            <div>
                <div className="table-wrapper">
                {/* <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6"><h2>Manage <b>Domains</b> Website</h2></div>
                        <div className="col-sm-6">
                            <div className="btn-group" data-toggle="buttons">
                                <label className="btn btn-info active">
                                    <input type="radio" name="status" value="all" checked="checked"> All
                                </label>
                                <label className="btn btn-success">
                                    <input type="radio" name="status" value="active"> Active
                                </label>
                                <label className="btn btn-warning">
                                    <input type="radio" name="status" value="inactive"> Inactive
                                </label>
                                <label className="btn btn-danger">
                                    <input type="radio" name="status" value="expired"> Expired
                                </label>       
                            </div>
                        </div>
                    </div>
                </div> */}
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Domain</th>
                            <th>Created&nbsp;On</th>
                            <th>Status</th>
                            <th>Server&nbsp;Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr data-status="active">
                            <td>1</td>
                            <td><a href="soengsouy.com">soengsouy.com</a></td>
                            <td>04/10/2019</td>
                            <td><span className="label label-success">Active</span></td>
                            <td>Khmer</td>
                            <td><a href="soengsouy.com" className="btn btn-sm manage">Manage</a></td>
                        </tr>
                        <tr data-status="inactive">
                            <td>2</td>
                            <td><a href="soengsouy.com">soengsouy.net</a></td>
                            <td>05/08/2018</td>
                            <td><span className="label label-warning">Inactive</span></td>
                            <td>Pursat</td>
                            <td><a href="#" className="btn btn-sm manage">Manage</a></td>
                        </tr>
                        <tr data-status="active">
                            <td>3</td>
                            <td><a href="soengsouy.com">webdesign.com</a></td>
                            <td>11/05/2020</td>
                            <td><span className="label label-success">Active</span></td>
                            <td>United Kingdom</td>
                            <td><a href="#" className="btn btn-sm manage">Manage</a></td>
                        </tr>
                        <tr data-status="expired">
                            <td>4</td>
                            <td><a href="soengsouy.com">soengsouy.org</a></td>
                            <td>06/09/2019</td>
                            <td><span className="label label-danger">Expired</span></td>
                            <td>USA</td>
                            <td><a href="#" className="btn btn-sm manage">Manage</a></td>
                        </tr>
                        <tr data-status="inactive">
                            <td>5</td>
                            <td><a href="soengsouy.com">khmer.com</a></td>
                            <td>12/08/2020</td>
                            <td><span className="label label-warning">Inactive</span></td>
                            <td>Cambodai</td>
                            <td><a href="#" className="btn btn-sm manage">Manage</a></td>
                        </tr>
                    </tbody>
                </table>
                </div> 
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        profileIA: state.profileInfo
    }
}

const mapDispatchToProps = dispatch => {
    console.log("mapDispatchToProps: ")
    return {
      getProfileInfo: (token, userID) => dispatch(getProfileAccountInfo(token, userID)),
    };
  };

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CollabTable));