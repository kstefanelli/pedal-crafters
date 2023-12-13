import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Footer from './components/footer';

const App = () => {
  return (
    <div className="page-container">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;