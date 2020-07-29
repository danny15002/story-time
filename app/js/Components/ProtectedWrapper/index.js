import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Store from '../../Store';


function withAuth(ComponentClass) {
  class WithAuth extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const activeUser = Store.getActiveUser();

      if (!activeUser)
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: this.props.location } }}
          />
        );

      const props = Object.keys(this.props)
        .filter(key => key !== 'component')
        .reduce((agg, key) => {
          agg[key] = this.props[key];
          return agg;
        }, {});

      return (
        <ComponentClass {...props} />
      );
    }
  }

  WithAuth.propTypes = { location: PropTypes.object.isRequired };
  WithAuth.displayName = `WithAuth(${getDisplayName(ComponentClass)})`;

  return WithAuth;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
