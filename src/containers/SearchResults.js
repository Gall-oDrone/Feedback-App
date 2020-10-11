import React from 'react';
import Result from "../components/GlobalSearchResults"
import { fetchSearchResults } from "../store/actions/search";
import { connect } from 'react-redux';

class Results extends React.Component {

  state = {
    query: null,
    loading: null
  }
  componentDidMount(){
    console.log("EHRENO III")
    if(this.props.match.params){
      let getObj = {params: {value: this.props.match.params.searchValue }}
      this.props.searchValue(getObj)
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log("EHRENO: ", prevProps.results, this.props.results, prevState.query, this.state.query)
    if(prevProps.results !== this.props.results){
      this.setState({query: this.props.results});
    }
    if(prevState.query !== this.state.query){
      this.setState({query: this.props.results});
    }
  }

  render(){
    const { query } = this.state
    console.log("EHRENO II: ", query)
      return(
        query &&
          <ul style= {{ listStyleType: 'none'}}>
            {Object.values(query).map(i => {
              return <Result item={i} key={i.id} />;
              // return (
              //   i.map((item, index) => {
              //     return <Result item={item} key={item.index} />;
              //   })
              // )
            })}
          </ul>
      )
  }

}

// const Results = ({ query }) => (
//     <ul style= {{ listStyleType: 'none'}}>
//         {query.map(i => {
//             return <Result item={i} key={i.id} />;
            
//         })}
//     </ul>
// );

const mapStateToProps = state => {
  return {
    results: state.search.results,
    loading: state.search.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchValue: (obj) => dispatch(fetchSearchResults(obj))
  };
};
  
export default
  connect(
    mapStateToProps, mapDispatchToProps)
  (Results);