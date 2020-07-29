import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <h1>Story Time</h1>
    <div>
      <Link to="/stories">Stories</Link>
    </div>
  </div>
);

export default Header;
