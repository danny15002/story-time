import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RouteNotFoundComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div>No matching route found.</div>
      </div>
    );
  }
}

export default RouteNotFoundComponent;
