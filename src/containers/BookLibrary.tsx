import * as React from 'react';

import {observer, inject} from 'mobx-react';

import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import LongArrowLeft from 'react-icons/lib/fa/long-arrow-left';

import BooksList from 'components/BooksList'

import {SORT} from 'stores/books';


class BookLibrary extends React.Component<any, any> {

  onRemoveItem = (itemId) => {
    this.props.books.removeItem(itemId);
  }

  onCoverClick = (itemId) => {
    this.props.history.push(`/details/${itemId}`);
  }

  componentDidMount(){
    const queryStringParsed = queryString.parse(this.props.location.search);

    this.applyCategory(this.props.match.params.category);
    if(queryStringParsed.sort){
      this.props.books.setCurrentSort(queryStringParsed.sort);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.category !== this.props.match.params.category){
      this.applyCategory(nextProps.match.params.category);
    }
  }

  applyCategory(category){
    this.props.books.setCurrentCategory(category);
  }

  handleSortChange = (e) => {
    this.props.books.setCurrentSort(e.target.value);
    this.props.history.push(`${this.props.location.pathname}?sort=${e.target.value}`);
  }

  renderSubHeading(){
    let subheadingText = '';

    if(this.props.match.params.category){
      subheadingText = this.props.match.params.category;
    }
    if(this.props.books.activeItems.length > 0){
      subheadingText = `${subheadingText} (${this.props.books.activeItems.length})`;
    }

    let subheading = null;
    if(subheadingText){
      subheading = (<em>{subheadingText}</em>);
    }

    return subheading;
  }

  renderEmptyList(){
    if(this.props.books.userItems.length === 0){
      return (<h2><LongArrowLeft />Search a title to add book to your collection</h2>)
    }
    return null;
  }

  renderSortComponent(){
    const sortOptions = Object.keys(SORT).map( (s) => (<option key={SORT[s]} value={SORT[s]}>{SORT[s]}</option>))
    return (
      <label className="bl-bookLibrary__sort">
        Sort By: 

        <select onChange={this.handleSortChange} value={this.props.books.currentSort}>
          {sortOptions}
        </select>
      </label>
    );
  }

  render() {
    return (
        <div className="bl-bookLibrary">
            <div className="bl-bookLibrary__header">
              <h1>My Books {this.renderSubHeading()}</h1>
              {this.renderSortComponent()}
            </div>
            {this.renderEmptyList()}
            <BooksList 
              itemList={this.props.books.activeItems} 
              linkable={true} 
              onCoverClick={this.onCoverClick}
              onRemoveItem={this.onRemoveItem} />
        </div>
    );
  }
}

export default inject('books')(withRouter(observer(BookLibrary)));
