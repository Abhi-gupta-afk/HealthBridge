import React, { useState } from 'react';

/**
 * Login component for user authentication
 */
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic will be implemented here
    console.log('Login attempt for user:', credentials.username);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
