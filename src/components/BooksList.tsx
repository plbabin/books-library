import * as React from 'react';

import {observer} from 'mobx-react';

import Book from './Book';

interface IBookListProps{
    itemList: any[];
    onRemoveItem(item:string);
    onAddItem?(item:string);
    onCoverClick?(item:string);
    linkable: boolean;
}

@observer
class BooksList extends React.Component<IBookListProps, any> {
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

export default BooksList;
