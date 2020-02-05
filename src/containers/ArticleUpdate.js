import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import ArticleCreate from "../components/ArticleForm"
import { Button } from 'antd';


class UpdateArticle extends React.Component {

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
                <ArticleCreate
                    {...this.props}
                    token={this.props.token}
                    requestType="put"
                    articleID={this.props.match.params.articleID}
                    btnText="Update"
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
export default UpdateArticle;