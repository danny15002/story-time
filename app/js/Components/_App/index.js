import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import RouteNotFoundComponent from '../RouteNotFoundComponent';

export const App = () => (
  <BrowserRouter>
    <Switch>
      {/* <Route path="/:resource/:id" exact component={ShowViewComponent} /> */}
      <Route component={RouteNotFoundComponent} />
    </Switch>
  </BrowserRouter>
);
