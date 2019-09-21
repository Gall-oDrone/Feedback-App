import React from "react";
import axios from "axios";
import Articles from "../components/Article";
import CustomForm from "../components/Form";
// import { Button, Card, Rate } from "antd";


class ArticleList extends React.Component {
  state = {
    articles: []
    //url:
  };

  fetchArticles = () => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      this.setState({
        articles: res.data
      });
    });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchArticles();      
    }
  }

  render() {
    return (
      <div>
        {/* <Card> */}
          <Articles data={this.state.articles} /> <br />
        {/* </Card> */}
        <h2> Create an article </h2>
        <CustomForm requestType="post" articleID={null} btnText="Create" />
      </div>
    );
  }
}

export default ArticleList;
