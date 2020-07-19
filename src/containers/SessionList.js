import React from 'react';
import Articles from '../components/Sessions';
import Filter from "./SessionFilterForm";
import axios from 'axios';
import {sessionListURL} from "../constants";


class ArticleList extends React.Component {

    state = {
        articles: [],
    }


    fetchArticles = () => {
        axios.get(sessionListURL)
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
                <Filter/>
                <div style={{paddingTop: "10px", paddingBottom: "10px"}} />
                <Articles data={this.state.articles} />      
            </div>

        )
    }
}

export default ArticleList;