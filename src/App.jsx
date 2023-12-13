import React, { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Cart } from './pages/Cart/Cart';

export const SeachContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SeachContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SeachContext.Provider>
    </div>
  );
}

export default App;
