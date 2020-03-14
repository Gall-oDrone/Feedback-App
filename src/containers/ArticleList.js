import React from 'react';
import Articles from '../components/Articles';
import axios from 'axios';
import {articleListURL} from "../constants";


class ArticleList extends React.Component {

    state = {
        articles: [],
        // hasMore: true
    }


    fetchArticles = () => {
        axios.get(articleListURL)
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