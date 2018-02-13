import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import {observable, runInAction, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';

@inject('books')
@withRouter
@observer
class BookDetails extends Component {
  @observable currentItem = null;

  componentWillMount(){
    runInAction( () => {
      this.currentItem = toJS(this.props.books.findById(this.props.match.params.id));
    })
  }

  render() {
    if(!this.currentItem){
      return <p>Book does not exists</p>
    }
    return (
        <div className="hs-bookDetails">
            <Link to="/">back</Link>
            
            <div className="hs-bookDetails__card">
              <h1>{this.currentItem.title}</h1>
            </div>
        </div>
    );
  }
}

export default BookDetails;
