import React from 'react';
import { Link } from 'react-router-dom';

import Store from '../../Store';

import './style.css';

const Logout = () => {
  localStorage.removeItem('user');
  Store.clearResources();

  return (
    <div className="logout-component">
      <div>
        <h1>You Have been logged out!</h1>
        <Link to="/login">Back to login page.</Link>
      </div>
    </div>
  );
};

export default Logout;
