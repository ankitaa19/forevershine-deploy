import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import CarPerfume from './images/CarPerfume.webp';
import DashboardPolish from './images/DashBoardPolish.webp';
import TyrePolish from './images/TyrePolish.webp';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CarwashShampoo from './images/CarWashShampoo.webp';

const baseProducts = [
  {
    id: 'car-perfume',
    name: 'Car Perfume',
    price: 225.00,
    priceDisplay: '₹ 225.00',
    image: CarPerfume,
  },
  {
    id: 'dash-board-polish',
    name: 'Dash-Board Polish',
    price: 90.00,
    priceDisplay: '₹ 90.00',
    image: DashboardPolish,
  },
  {
    id: 'tyre-polish',
    name: 'Tyre Polish',
    price: 90.00,
    priceDisplay: '₹ 90.00',
    image: TyrePolish,
  },
  {
    id: 'car-wash-shampoo',
    name: 'Car Wash Shampoo',
    price: 140.00,
    priceDisplay: '₹ 140.00',
    image: CarwashShampoo,
  }
];

// Create 16 products by repeating the base products
const products = Array(16).fill(0).map((_, index) => {
  const baseProduct = baseProducts[index % baseProducts.length];
  return {
    ...baseProduct
  };
});

export default function CarCare() {
  const { addToCart } = useCart();
  const [sortOrder, setSortOrder] = useState('default');
  const [filterText, setFilterText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    let sortedProducts = [...filteredProducts];
    if (value === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts = [...products];
    }
    setFilteredProducts(sortedProducts);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
    // Reset sort order when filtering
    setSortOrder('default');
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight text-gray-900 drop-shadow">Car Care Products</h1>
      <div className="flex flex-col sm:flex-row flex-wrap justify-between mb-6 gap-4">
        <div className="w-full sm:w-auto flex items-center">
          <label htmlFor="filter" className="mr-2 font-semibold whitespace-nowrap">Filter:</label>
          <input
            id="filter"
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Filter by product name"
            className="w-full sm:w-auto border border-teal-700 rounded p-2 text-teal-700 font-semibold bg-teal-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 placeholder:text-gray-500 text-sm md:text-base"
          />
        </div>
        <div className="w-full sm:w-auto flex items-center">
          <label htmlFor="sort" className="mr-2 font-semibold whitespace-nowrap">Sort By:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full sm:w-auto border border-teal-700 rounded p-2 text-teal-700 font-semibold bg-teal-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 text-sm md:text-base"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 transform hover:-translate-y-2"
          >
            <Link to={`/product/${product.id}`} className="w-full">
              <Zoom zoomMargin={80} transitionDuration={400} zoomZindex={1000} overlayBgColorEnd="rgba(0, 0, 0, 0.85)">
                <img src={product.image} alt={product.name} className="w-full h-auto sm:w-56 sm:h-56 object-cover mb-3 shadow" />
              </Zoom>
              <span className="text-lg font-semibold text-gray-800 mb-1">{product.name}</span>
            </Link>
            <div className="flex items-center justify-between w-full mt-1">
              <span className="text-base font-bold text-teal-700">{product.priceDisplay}</span>
            </div>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="w-full text-white bg-teal-700 hover:bg-teal-800 p-2 shadow transition-colors duration-200 ml-2 rounded"
            >
              <span className="text-sm md:text-base font-medium">ADD TO CART</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
