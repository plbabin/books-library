import React, { Component } from 'react';

import {observer} from 'mobx-react';

import Book from 'components/Book';

@observer
class BooksList extends Component {
    render() {
        if(!this.props.itemList || this.props.itemList.length === 0){
            return null;
        }
        const itemList = this.props.itemList.map( (item) => {
            let author = '';
            if(item.authors && item.authors.length > 0){
                author = item.authors[0];
            }

            return (<Book 
                        key={item.id}
                        id={item.id} 
                        title={item.title}
                        author={author}
                        image={item.thumbnail}
                        saved={item.saved}
                        linkable={this.props.linkable}
                        onAddItem={this.props.onAddItem}
                        onRemoveItem={this.props.onRemoveItem}
                        />
            );
        });
        return (
            <div className="hs-booksList">
                {itemList}
            </div>
        );
    }
}

export default BooksList;
