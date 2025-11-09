import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Navigation header component
 */
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">HealthBridge</Link>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/appointments">Appointments</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
