import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Cart } from './pages/Cart/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <NotFound /> */}
      </div>
    </div>
  );
}

export default App;
