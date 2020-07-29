import React, { Component } from 'react';

import withAuth from '../ProtectedWrapper';

class StoriesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div>Stories</div>
      </div>
    );
  }
}

export default withAuth(StoriesComponent);
