import React, { Component } from 'react';

import {observable, when, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';

import { withRouter, NavLink } from 'react-router-dom';

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
    this.updateSearchFieldValue('');

    this.handleSearchTerm = when( () => {
      return this.props.books.searchTerm.length > 0
    }, () => {
      this.updateSearchFieldValue(this.props.books.searchTerm);
    })
  }

  handleSidebarLinkClick = () => {
    this.updateSearchFieldValue('');
    this.props.books.resetCurrentSort();
  }

  handleBlur = (e) => {
    if(e.target.value === ''){
      this.props.history.replace(`/`)
    }
  }

  componentDidMount(){
    this.updateSearchFieldValue(this.props.books.searchTerm);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname.indexOf('/search') > -1){
      this.updateSearchFieldValue(this.props.books.searchTerm);
    }else{
      this.updateSearchFieldValue('');
    }
  }

  doSearch = (searchTerm) => {
    this.props.books.search(searchTerm);
    this.props.history.replace(`/search/${searchTerm}`)
  }

  updateSearchFieldValue(value){
    runInAction( () => {
      this.inputValue = value;
      if(value === ''){
        this.props.books.clearSearch();  
      }
    })
  }

  onChange = (e) => {
    this.doSearch(e.target.value);
    this.updateSearchFieldValue(e.target.value);
  }

  clearSearch = () => { 
    this.updateSearchFieldValue('');
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
      <ul className="bl-sidebar__section">
        {categories}
      </ul>
    );
  }

  render() {
    return (
        <div className="bl-sidebar">
            <div className="search-field">
              <span className="icon"><Search /></span>
              <input type="text"
                     onBlur={this.handleBlur} 
                     onChange={this.onChange} 
                     value={this.inputValue} 
                     placeholder="Search by title..." />
              {this.inputValue.length > 0 && <span className="icon"><TimesCircle onClick={ this.clearSearch } /></span>}
            </div>

            <ul className="bl-sidebar__section">
              <li>
                <NavLink 
                  exact={true}
                  to="/" onClick={this.handleSidebarLinkClick} 
                  activeClassName="active">
                  <Book /> My Books <em className="pill">{this.props.books.userItems.length}</em>
                </NavLink>
              </li>
            </ul>
            {this.renderCategories()}
        </div>
    );
  }
}

export default Sidebar;
