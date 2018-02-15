import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';

import { withRouter } from 'react-router-dom';

import LongArrowLeft from 'react-icons/lib/fa/long-arrow-left';


import BooksList from 'components/BooksList'

@inject('books')
@withRouter
@observer
class BookSaved extends Component {

  onRemoveItem = (itemId) => {
    this.props.books.removeItem(itemId);
  }

  onCoverClick = (itemId) => {
    this.props.history.push(`/details/${itemId}`);
  }

  componentDidMount(){
    this.applyCategory(this.props.match.params.category);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.category !== this.props.match.params.category){
      this.applyCategory(nextProps.match.params.category);
    }
  }

  applyCategory(category = null){
    this.props.books.setCurrentCategory(category);
  }

  renderSubHeading(){
    let subheadingText = '';
    let subheading = null;

    if(this.props.match.params.category){
      subheadingText = this.props.match.params.category;
    }
    if(this.props.books.activeItems.length > 0){
      subheadingText = `${subheadingText} (${this.props.books.activeItems.length})`;
    }
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

  render() {
    return (
        <div className="hs-bookSaved">
            <h1>My Books {this.renderSubHeading()}</h1>
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

export default BookSaved;
