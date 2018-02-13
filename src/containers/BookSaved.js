import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';

import { withRouter } from 'react-router-dom';

import BooksList from 'components/BooksList'

@inject('books')
@withRouter
@observer
class BookSaved extends Component {

  onRemoveItem = (itemId) => {
    this.props.books.removeItem(itemId);
  }

  renderSubHeading(){
    let subheadingText = '';
    let subheading = null;

    if(this.props.match.params.category){
      subheadingText = this.props.match.params.category;
    }
    if(this.props.books.activeItems.length > 0){
      subheadingText = `${subheadingText} (${this.props.books.activeItems.length}`;
    }
    if(subheadingText){
      subheading = (<em>{subheadingText}</em>);
    }

    return subheading;
  }

  render() {
    return (
        <div className="hs-bookSaved">
            <h1>My Books {this.renderSubHeading()}</h1>

            <BooksList 
              itemList={this.props.books.activeItems} 
              linkable={true} 
              onRemoveItem={this.onRemoveItem} />
        </div>
    );
  }
}

export default BookSaved;
