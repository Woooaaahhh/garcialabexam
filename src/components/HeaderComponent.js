import React from 'react';
import { NavLink } from 'react-router-dom';

function HeaderComponent() {
  return (
    <header>
      <h1>Student Info App</h1>
      <nav>
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/students">Students</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderComponent;
