import React, { Component } from 'react';

import {observer} from 'mobx-react';

@observer
class BookList extends Component {
  render() {
    return (
        <div className="hs-bookDetails">
            <h1>Book details</h1>
        </div>
    );
  }
}

export default BookList;
