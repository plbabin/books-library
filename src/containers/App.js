import React, { Component } from 'react';

import {autorun} from 'mobx';
import {observer, inject} from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Sidebar from 'containers/Sidebar';
import BookDetails from 'containers/BookDetails';
import BookSearchResults from 'containers/BookSearchResults';
import BookSaved from 'containers/BookSaved';

@inject('books')
@observer
@withRouter
class App extends Component {

  componentWillMount(){
    this.searchHandler = autorun(() => {
        if(this.props.books.searchTerm.length > 0){
          this.props.history.replace(`/search/${this.props.books.searchTerm}`)
        }
    });
  }

  render() {
    return (
      <div className="app">
        <Sidebar />
        <main className="hs-page">
          <div className="hs-container">
            <Switch>
              <Route exact path='/' component={BookSaved}/>
              <Route exact path='/search/:term' component={BookSearchResults}/>
              <Route path='/details/:id' component={BookDetails}/>
            </Switch>
          </div>  
        </main>
      </div>
    );
  }
}

export default App;
