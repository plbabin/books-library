import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

import Book from 'components/Book';

@observer
class BooksList extends Component {
    generateItemProps(item){
        let author = '';
        if(item.authors && item.authors.length > 0){
            author = item.authors[0];
        }

        const {itemList,...propsFromParent} = this.props;

        return {
            id:item.id,
            title:item.title,
            author:author,
            image:item.thumbnail,
            saved:item.saved,
            ...propsFromParent
        };
    }

    render() {
        if(!this.props.itemList || this.props.itemList.length === 0){
            return null;
        }
        const itemList = this.props.itemList.map( (item) => {
            const props = this.generateItemProps(item);
            return (<Book key={item.id} {...props} />);
        });
        return (
            <div className="bl-booksList">
                {itemList}
            </div>
        );
    }
}


BooksList.propTypes = {
    itemList: PropTypes.array.isRequired,
    onAddItem: PropTypes.func,
    onRemoveItem: PropTypes.func.isRequired,
    onCoverClick: PropTypes.func,
    linkable: PropTypes.bool.isRequired,
};

export default BooksList;
