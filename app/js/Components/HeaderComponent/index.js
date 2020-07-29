import React from 'react';
import { Link } from 'react-router-dom';

import Store from '../../Store';

import './style.css';

const HeaderComponent = () => (
  <div className="header-component">
    <h1 className="header-title">Story Time</h1>
    <div className="nav-bar">
      <Link to="/stories">Stories</Link>
      { Store.getActiveUser().role === 'user'? <Link to="/stories/new">New Story</Link> : null}
      <Link to="/logout">Log Out</Link>
    </div>
  </div>
);

export default HeaderComponent;
