import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import ProductsList from './components/products/products-list/list-main-view';
import ProductsStatistics from "./components/products/products-statistics/statistics-main-view"
import ImagesList from './components/images/image-main-view';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products-list" element={<ProductsList />} />
            <Route path="/products-statistics" element={<ProductsStatistics />} />
            <Route path="/images-list" element={<ImagesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


