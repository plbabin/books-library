import React, { Component } from 'react';

import {observable, when} from 'mobx';
import {observer, inject} from 'mobx-react';

import { withRouter, Link, NavLink } from 'react-router-dom';

import Book from 'react-icons/lib/fa/book';
import Bookmark from 'react-icons/lib/fa/bookmark';
import Search from 'react-icons/lib/fa/search';
import TimesCircle from 'react-icons/lib/fa/times-circle';


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

  handleSidebarLinkClick = () => {
    this.setState({inputValue: ''})
  }

  componentDidMount(){
    this.setState({inputValue: this.props.books.searchTerm})
  }

  doSearch = (searchTerm) => {
    this.props.history.replace(`/search/${searchTerm}`)
    this.props.books.search(searchTerm);
  }

  onChange = (e) => {
    this.doSearch(e.target.value);
    this.setState({inputValue: e.target.value})
  }

  clearSearch = () => { 
    this.setState({inputValue: ''}); 
    this.props.history.push(`/`)
  }

  renderCategories(){
    if(this.props.books.categories.length === 0){
      return null;
    }
    const categories = Object.keys(this.props.books.categories).map( (cat) => {
      return (
        <li key={cat}>
          <NavLink 
            to={`/category/${cat}`} 
            onClick={this.handleSidebarLinkClick}
            activeClassName="active">
              <Bookmark />
              {cat}
              <em className="pill">{this.props.books.categories[cat]}</em>
            </NavLink>
        </li>
      );
    });

    return (
      <ul className="hs-sidebar__section">
        {categories}
      </ul>
    );
  }

  render() {
    return (
        <div className="hs-sidebar">
            <div className="search-field">
              <span className="icon"><Search /></span>
              <input type="text" onChange={this.onChange} value={this.state.inputValue} placeholder="Search book to add" />
              {this.state.inputValue.length > 0 && <span className="icon"><TimesCircle onClick={ this.clearSearch } /></span>}
            </div>

            <ul className="hs-sidebar__section">
              <li>
                <NavLink to="/" onClick={this.handleSidebarLinkClick} activeClassName="active"><Book /> My Books <em className="pill">{this.props.books.userItems.length}</em></NavLink>
              </li>
            </ul>
            {this.renderCategories()}
        </div>
    );
  }
}

export default Sidebar;
