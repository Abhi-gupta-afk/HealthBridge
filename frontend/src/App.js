import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>HealthBridge</h1>
          <p>Healthcare Management System</p>
        </header>
        <Routes>
          {/* Routes will be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
