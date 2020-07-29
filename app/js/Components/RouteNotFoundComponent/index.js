import React, { Component } from 'react';

import HeaderComponent from '../HeaderComponent';

class RouteNotFoundComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderComponent />
        <div>No matching route found.</div>
      </div>
    );
  }
}

export default RouteNotFoundComponent;
