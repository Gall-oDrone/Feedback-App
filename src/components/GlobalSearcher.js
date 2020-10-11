import React from 'react';
import { connect } from 'react-redux';
// import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import {searchListURL} from "../constants";
import { fetchSearchResults } from "../store/actions/search";
import axios from 'axios';
import lodash from "lodash";
import "../assets/searcher.css"

const history = createHistory();

class Searcher extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      previewVisible: false,
      loading: false,
      value: null
    };
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("handleFormSubmit", event.target.values, this.state.value)
      let getObj = {params: {value: this.state.value}}
      this.props.searchValue(getObj)
      history.push(`/search/${this.state.value}`);
          // axios.defaults.headers = {
          //   "Content-Type": "application/json",
          // }
          // axios.get(searchListURL, getObj)
          //   .then(res => {
          //     if (res.status === 200) {
          //       console.log("EHRENO GET")
          //       history.push(`/search/${this.state.value}`);
          //     }
          //   })
          //   .catch(error => console.error(error))
          //   console.log('Error');
  }

  render() {
    console.log("props & state: "+ JSON.stringify(this.props), this.state)
    const { value } = this.state;
    return (
        <div class="search_9f7e4">
            <form class="form_6d416" method="GET" onSubmit={this.handleFormSubmit.bind(this)} action="/search">
                <label class="font_9d927 small_231df normal_d2e66 lineHeight_042f1 underline_57d3c">
                    <span class="searchIcon_11e88">
                        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.383 10.347a5.796 5.796 0 1 1 .965-.964L15 14.036l-.964.964-4.653-4.653zm-3.588-.12a4.432 4.432 0 1 0 0-8.863 4.432 4.432 0 0 0 0 8.863z" fill="#BBB" fill-rule="evenodd">
                            </path>
                        </svg>
                    </span>
                    <div>
                        <input 
                        autocomplete="on" 
                        class="input_277cf" 
                        data-test="search-input" 
                        name="q" 
                        placeholder="Discover your next favorite thing…" 
                        title="Search" 
                        value={value} 
                        onChange={this.handleChange.bind(this)}
                        ></input>
                    </div>
                    {/* <button class="close_067e5" type="reset">
                        <span>
                            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 4.586l4.24-4.24a1 1 0 1 1 1.416 1.413L7.413 6l4.24 4.24a1 1 0 1 1-1.413 1.416L6 7.413l-4.24 4.24A1 1 0 1 1 .344 10.24L4.587 6 .347 1.76A1 1 0 1 1 1.757.343L6 4.587z" fill-rule="evenodd"></path>
                            </svg>
                        </span>
                    </button> */}
                </label>
            </form>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchValue: (obj) => dispatch(fetchSearchResults(obj))
  };
};
export default connect(null, mapDispatchToProps)(Searcher);