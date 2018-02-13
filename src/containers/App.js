import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Sidebar from 'containers/Sidebar';
import BookDetails from 'containers/BookDetails';
import BookSearchResults from 'containers/BookSearchResults';
import BookSaved from 'containers/BookSaved';

class App extends Component {
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
