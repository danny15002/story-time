import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import LoginComponent from '../LoginComponent';
import NewStoriesComponent from '../NewStoriesComponent';
import StoriesComponent from '../StoriesComponent';
import StoryComponent from '../StoryComponent';
import RouteNotFoundComponent from '../RouteNotFoundComponent';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={LoginComponent} />
      <Route path="/stories/new" exact component={NewStoriesComponent} />
      <Route path="/stories" exact component={StoriesComponent} />
      <Route path="/stories/:id" exact component={StoryComponent} />
      <Route component={RouteNotFoundComponent} />
    </Switch>
  </BrowserRouter>
);
