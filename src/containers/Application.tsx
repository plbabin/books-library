import * as React from 'react';

import {observer, inject} from 'mobx-react';
import { Route, withRouter, Switch, RouteComponentProps } from 'react-router-dom';

import Sidebar from 'containers/Sidebar';
import BookDetails from 'containers/BookDetails';
import BookSearchResults from 'containers/BookSearchResults';
import BookLibrary from 'containers/BookLibrary';

// inform we match url /:id
interface IMatchParams {
  id: string;
}

// Note we use Partial<RouteComponentProps> to make all RouteComponentProps as optional for high order component
interface IComponentProps extends Partial<RouteComponentProps<IMatchParams>> {
}

@inject('books')
@withRouter
@observer
class Application extends React.Component<IComponentProps,any> {

  render() {
    return (
      <div className="app">
        <Sidebar />
        <main className="bl-page">
          <div className="bl-container">
            <Switch>
              <Route path='/category/:category' component={BookLibrary}/>
              <Route path='/search/:term' component={BookSearchResults}/>
              <Route path='/details/:id' component={BookDetails}/>
              <Route exact path='/' component={BookLibrary}/>
            </Switch>
          </div>  
        </main>
      </div>
    );
  }
}

export default Application;
