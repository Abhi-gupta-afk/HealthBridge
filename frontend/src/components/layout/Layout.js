import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

/**
 * Main layout component
 * Wraps all pages with header and footer
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
