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

  handleSidebarLinkClick = () => {
    this.setState({inputValue: ''})
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

  renderCategories(){
    if(this.props.books.categories.length === 0){
      return null;
    }
    const categories = this.props.books.categories.map( (cat) => {
      return (
        <li key={cat}>
          <Link to={`/category/${cat}`} onClick={this.handleSidebarLinkClick}>{cat}</Link>
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
              <input type="text" onChange={this.onChange} value={this.state.inputValue} placeholder="Search book to add" />
            </div>

            <ul className="hs-sidebar__section">
              <li>
                <Link to="/" onClick={this.handleSidebarLinkClick}>My Books</Link>
              </li>
            </ul>
            {this.renderCategories()}
        </div>
    );
  }
}

export default Sidebar;
