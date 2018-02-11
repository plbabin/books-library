import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';
import { Route, Switch, withRouter } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>header</header>
        <main className="container">
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
