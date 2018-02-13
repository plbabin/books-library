import React, { Component } from 'react';

import {observer} from 'mobx-react';

@observer
class BookSearchResults extends Component {
  render() {
    return (
        <div className="hs-booklist">
            <h1>Search Results</h1>
        </div>
    );
  }
}

export default BookSearchResults;
