import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card, Rate, Divider, Tabs, Radio } from "antd";
import CustomForm from "../components/Form";
import Comments from "../components/Comment";
import ContactChoices from "../components/ContactChoices";
import FeedbackChoices from "../components/FeedbackChoices";
import Rewards from "../components/Reward"

const { TabPane } = Tabs;

class ArticleDetail extends React.Component {
  state = {
    article: {}
  };
  componentDidMount() {
    const articleID = this.props.match.params.articleID;
    axios.get(`http://127.0.0.1:8000/api/${articleID}`).then(res => {
      this.setState({
        article: res.data
      });
    });
  }

  handleDelete = event => {
    event.preventDefault();
    const articleID = this.props.match.params.articleID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(`http://127.0.0.1:8000/api/${articleID}/delete/`)
      .then(res => {
        if (res.status === 204) {
          this.props.history.push(`/`);
        }
      })
  };

  render() {
    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            <Card title={this.state.article.title}>
              <p> {this.state.article.content} </p>
              <p> Rating </p>
              <Divider />
              <p> <Rate /> </p>
              <p>
                < Comments />
              </p>
            </Card>
            <CustomForm
              {...this.props}
              token={this.props.token}
              requestType="put"
              articleID={this.props.match.params.articleID}
              btnText="Update"
            />
            <form onSubmit={this.handleDelete}>
              <Button type="danger" htmlType="submit">
                Delete
            </Button>
            </form>
          </TabPane>
          <TabPane tab="Feedback" key="2">
            <p>
              <FeedbackChoices/>
            </p>
            <p>
              <ContactChoices/>
            </p>
          </TabPane>
          <TabPane tab="Rewards" key="3">
            <p align="center">
              <Rewards/>
            </p>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ArticleDetail);
