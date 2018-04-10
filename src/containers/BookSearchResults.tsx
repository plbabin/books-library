import * as React from 'react';

import {observer, inject} from 'mobx-react';

import { withRouter } from 'react-router-dom';

import Spinner from "react-svg-spinner";

import BooksList from 'components/BooksList';

@inject("books")
@withRouter
@observer
class BookSearchResults extends React.Component<any, any> {

  componentDidMount(){
    this.props.books.search(this.props.match.params.term);
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
        <div className="bl-booksList">
            <h1>Search Results {searchTermResults}</h1>

            {this.props.books.isLoading && 
              <div className="spinner"><Spinner size="80px"/></div>
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
