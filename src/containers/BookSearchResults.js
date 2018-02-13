import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';

import { withRouter } from 'react-router-dom';

import BooksList from 'components/BooksList';

@inject("books")
@withRouter
@observer
class BookSearchResults extends Component {

  componentDidMount(){
    this.props.books.search(this.props.match.params.term);
  }

  componentWillUnmount(){
    //this.props.books.clearSearch();
  }

  onAddItem = (itemId) => {
    this.props.books.addItem(itemId);
  }

  onRemoveItem = (itemId) => {
    this.props.books.removeItem(itemId);
  }

  render() {
    let searchTermResults = null;
    if(!this.props.books.isLoading && this.props.books.searchTerm){
      searchTermResults = (<em>{this.props.books.searchTerm} ({this.props.books.searchResults.length})</em>);
    }
    return (
        <div className="hs-booklist">
            <h1>Search Results {searchTermResults}</h1>

            {this.props.books.isLoading && 
              <p>Is loading</p>
            }

            {!this.props.books.isLoading && 
              <BooksList 
                itemList={this.props.books.searchResults} 
                linkable={false} 
                onAddItem={this.onAddItem}
                onRemoveItem={this.onRemoveItem} />
            }
        </div>
    );
  }
}

export default BookSearchResults;
