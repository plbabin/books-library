import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';
import BooksList from 'components/BooksList';

@inject("books")
@observer
class BookSearchResults extends Component {

  render() {
    return (
        <div className="hs-booklist">
            <h1>Search Results</h1>
            {this.props.books.isLoading && <p>Is loading</p>}
            {!this.props.books.isLoading && <BooksList itemList={this.props.books.searchResults} linkable={false} />}
        </div>
    );
  }
}

export default BookSearchResults;
