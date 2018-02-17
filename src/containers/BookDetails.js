import React, { Component } from 'react';

import { withRouter, Link } from 'react-router-dom';

import {observable, runInAction} from 'mobx';
import {observer, inject} from 'mobx-react';

@inject('books')
@withRouter
@observer
class BookDetails extends Component {
  @observable currentItem = null;

  componentWillMount(){
    runInAction( () => {
      this.currentItem = this.props.books.findById(this.props.match.params.id);
    })
  }

  goToAuthor = (author) => {
    const authorTerm = `inauthor:${author}`;
    this.props.books.setSearchTerm(authorTerm);
    this.props.history.push(`/search/${authorTerm}`);
  }

  renderAuthors(){
    const {authors} = this.currentItem;
    if(!authors){
      return null;
    }
    
    return (<p className="authors">
      {authors.map( (author) => (<a key={author} onClick={ ()=> this.goToAuthor(author) }>{author}</a>) )}
    </p>);
  }

  render() {
    if(!this.currentItem){
      return <p>Book does not exists</p>
    }

    const {title, thumbnail, description, publishedDate} = this.currentItem;

    return (
        <div className="bl-bookDetails">
            <Link to="/">back</Link>
            
            <div className="bl-bookDetails__card">
              <div className="bl-book-cover">
                <img src={thumbnail} alt=""/>
              </div>
              <div className="bl-bookDetails__info">  
                <h1>{title} <em>{publishedDate}</em>  </h1>
                {this.renderAuthors()}
                <p>{description}</p>
              </div>
            </div>
        </div>
    );
  }
}

export default BookDetails;
