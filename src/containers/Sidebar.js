import React, { Component } from 'react';

import {observable, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';
import {debounce} from 'throttle-debounce';

@inject('books')
@observer
class Sidebar extends Component {
  @observable inputValue = '';
  constructor(){
    super();
    this.doSearch = debounce(300, this.doSearch);
    this.state = {inputValue:''}
  }

  componentWillMount(){
    //this.setState({inputValue: this.props.books.searchTerm})
  }

  doSearch = (searchTerm) => {
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
              <input type="text" onChange={this.onChange} value={this.state.inputValue} placeholder="Search book to add" />
            </div>
        </div>
    );
  }
}

export default Sidebar;
