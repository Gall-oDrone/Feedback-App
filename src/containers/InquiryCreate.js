import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import InquiryCustomForm from "../components/InquiryForm"
import { Button } from 'antd';


class CreateArticle extends React.Component {

    state = {
        articles: [],
        // hasMore: true
    }

    componentDidMount() {
    }
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
           console.log("Something should occur")
           
        }

    }

    render() {
        return (
            <div align="center">
                <InquiryCustomForm 
                    requestType="post" 
                    articleID={null}
                    btnText="Create"
                />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(CreateArticle);