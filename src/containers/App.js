import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Sidebar from 'containers/Sidebar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <main className="hs-page-container">
          <Switch>
            <Route exact path='/' />
            <Route path='/details/:id' />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
