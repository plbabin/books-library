import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';
import { Route, withRouter } from 'react-router-dom';

import Sidebar from 'containers/Sidebar';
import BookDetails from 'containers/BookDetails';
import BookSearchResults from 'containers/BookSearchResults';
import BookSaved from 'containers/BookSaved';

@inject('books')
@withRouter
@observer
class App extends Component {

  render() {
    return (
      <div className="app">
        <Sidebar />
        <main className="hs-page">
          <div className="hs-container">
            <Route exact path='/' component={BookSaved}/>
            <Route path='/category/:category' component={BookSaved}/>
            <Route path='/search/:term?' component={BookSearchResults}/>
            <Route path='/details/:id' component={BookDetails}/>
          </div>  
        </main>
      </div>
    );
  }
}

export default App;
