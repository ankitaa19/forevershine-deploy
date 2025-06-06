import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [sortOrder, setSortOrder] = useState('default');
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

  // Placeholder for filter logic - currently no filters implemented
  // Could add filter state and logic here

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight text-gray-900 drop-shadow">Car Care Products</h1>
      <div className="flex justify-end mb-6 gap-4">
        <div>
          <label htmlFor="sort" className="mr-2 font-semibold">Sort By:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="border border-teal-700 rounded p-2 text-teal-700 font-semibold bg-teal-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        {/* Future filter UI can be added here */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <Link
            key={index}
            to={`/product/${product.id}`}
            className="flex flex-col items-center bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 transform hover:-translate-y-2 cursor-pointer"
          >
            <Zoom>
            <img src={product.image} alt={product.name} className="w-56 h-56 object-cover  mb-3 shadow" /> </Zoom>
            <span className="text-lg font-semibold text-gray-800 mb-1">{product.name}</span>
            <div className="flex items-center justify-between w-full mt-1">
              <span className="text-base font-bold text-teal-700">{product.priceDisplay}</span>
            </div>
            <button className="w-full text-white bg-teal-700 hover:bg-teal-800  p-2 shadow transition-colors duration-200 ml-2">
                <span className="text-sm md:text-base font-medium">ADD TO CART</span>
              </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
