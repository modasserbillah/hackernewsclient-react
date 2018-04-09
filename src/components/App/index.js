import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import axios from 'axios';
import Search from '../Search';
import Table from '../Table';
import Button from '../Button';



const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const Loading = () =>
  <div className="fa fa-spinner fa-spin"> </div>

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
       results: null,
       searchKey: '',
       searchTerm: DEFAULT_QUERY,
       isLoading : false,
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchSubmit(event){
    const { searchTerm } =  this.state ;
    //console.log(searchTerm);
    this.setState({ searchKey : searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  setSearchTopStories(result){
    const {hits, page} = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [] ;

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
      [searchKey] : { hits: updatedHits, page }
    },
    isLoading: false
    });
  }

  fetchSearchTopStories(searchTerm, page){
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
          .then(result => this.setSearchTopStories(result.data))
          .catch(e => e);
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.setState({ searchKey : searchTerm });
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
         ...results,
         [searchKey]: {hits: updatedHits, page }
        }
    });


}

onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
}

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      isLoading
     } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0 ;
  //  if( !result ){ return null; }
    const list = ( results && results[searchKey] && results[searchKey].hits) || [] ;

    return (
      <div className="page">
        <div className="interactions">

            <Search
                  value={searchTerm}
                  onChange={this.onSearchChange}
                  onSubmit={this.onSearchSubmit}
            >
                Search
            </Search>
          </div>
          <Table
                  list = {list}
                  onDismiss = {this.onDismiss}
                />

          <div className="interactions">
          { isLoading
            ? <Loading />
            :<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                More
              </Button>
          }
          </div>
      </div>
    );
  }
}


export default App;

export {
  Button,
  Search,
  Table,
};
