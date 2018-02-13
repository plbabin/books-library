import React, { Component } from 'react';

import {observer} from 'mobx-react';

import BooksList from 'components/BooksList'

@observer
class BookSaved extends Component {
  render() {
    return (
        <div className="hs-bookSaved">
            <h1>My Books</h1>
            <BooksList /> 
        </div>
    );
  }
}

export default BookSaved;
