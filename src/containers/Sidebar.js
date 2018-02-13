import React, { Component } from 'react';

import {observable, when} from 'mobx';
import {observer, inject} from 'mobx-react';

import { withRouter, Link } from 'react-router-dom';

import {debounce} from 'throttle-debounce';

@inject('books')
@withRouter
@observer
class Sidebar extends Component {
  @observable inputValue = '';
  
  constructor(props){
    super(props);

    this.doSearch = debounce(300, this.doSearch);
    this.state = {inputValue:''}

    this.handleSearchTerm = when( () => {
      return this.props.books.searchTerm.length > 0
    }, () => {
      this.setState({inputValue: this.props.books.searchTerm});
    })
  }

  handleHomeClick = () => {
    this.props.history.push('/');
    this.setState({inputValue: ''})
  }

  handleFocus = () => {
    this.props.history.push('/search');
  }

  componentDidMount(){
    this.setState({inputValue: this.props.books.searchTerm})
  }

  doSearch = (searchTerm) => {
    this.props.history.push(`/search/${searchTerm}`)
    this.props.books.search(searchTerm);
  }

  onChange = (e) => {
    this.doSearch(e.target.value);
    this.setState({inputValue: e.target.value})
  }

  render() {
    return (
        <div className="hs-sidebar">
            <div className="search-field">
              <input type="text" onFocus={this.handleFocus} onChange={this.onChange} value={this.state.inputValue} placeholder="Search book to add" />
            </div>

            <ul className="hs-sidebar__section">
              <li>
                <a onClick={this.handleHomeClick}>My Books</a>
              </li>
            </ul>
            
        </div>
    );
  }
}

export default Sidebar;
