import React, { Component } from 'react';

import {observer} from 'mobx-react';

@observer
class Book extends Component {
    render() {
    return (
        <div className="hs-book">
            <div className="cover">
                <button className="btn btn-remove">remove</button>
                <img src="https://books.google.com/books/content?id=K5zOroHn_LYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt=""/>
            </div>
            <h1>The Ivory Tower and Harry Potter</h1>
            <h2>Lana A. Whited</h2>
        </div>
    );
    }
}

export default Book;
