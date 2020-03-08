import React from 'react';
import Inquiries from './Peers/PeerList';
import axios from 'axios';
import { connect } from 'react-redux';
import InquiryCustomForm from "../containers/InquiryCreate"
import { Button } from 'antd';

class InquiryList extends React.Component {

    state = {
        inquiries: [],
        // hasMore: true
    }


    fetchInquirys = () => {
        axios.get("http://127.0.0.1:8000/api/inquiries/list/")
        .then(res => {
            this.setState({
                inquiries: res.data
            });
        });
    }

    componentDidMount() {
        this.fetchInquirys();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            console.log("componentWillReceiveProps newProps: ")
            console.log(newProps)
            this.fetchInquirys();
        }

    }

    render() {
        console.log(" InquiryList this.props: ")
        console.log(this.props)
        console.log(this.state)
        return (
            <div align="center">
                <Inquiries data={this.state.inquiries} />      
            </div>

        )
    }
}

export default InquiryList;