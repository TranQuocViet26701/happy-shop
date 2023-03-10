import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products/*" element={<ProductFeature />} />
        <Route path="/cart" element={<CartFeature />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
