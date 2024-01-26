import { Routes, Route } from 'react-router-dom';
import './scss/App.scss';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Cart } from './pages/Cart/Cart';
import FullPizza from './pages/FullPizza/FullPizza';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
