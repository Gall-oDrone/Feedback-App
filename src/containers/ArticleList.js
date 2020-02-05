import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import { connect } from 'react-redux';
import ArticleCustomForm from "../containers/ArticleCreate"
import { Button } from 'antd';

class ArticleList extends React.Component {

    state = {
        articles: [],
        // hasMore: true
    }


    fetchArticles = () => {
        axios.get("http://127.0.0.1:8000/articles/")
        .then(res => {
            this.setState({
                articles: res.data
            });
        });
    }

    componentDidMount() {
        this.fetchArticles();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            console.log("componentWillReceiveProps newProps: ")
            console.log(newProps)
            this.fetchArticles();
        }

    }

    render() {
        console.log(" ArticleList this.props: ")
        console.log(this.props)
        console.log(this.state)
        return (
            <div align="center">
                <Articles data={this.state.articles} />      
            </div>

        )
    }
}

export default ArticleList;