import React, { Component } from 'react';

import {observer} from 'mobx-react';

import Book from 'components/Book';

@observer
class BooksList extends Component {
    render() {
        const itemList = Array.from(Array(20).keys()).map( () => {
            return (<Book />);
        })
        return (
            <div className="hs-booksList">
                {itemList}
            </div>
        );
    }
}

export default BooksList;
