import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, QueueListIcon, PhotoIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-black w-64 min-h-screen flex flex-col bg-gray-50">
      <div className="p-3 text-2xl font-bold text-indigo-600">Data Flux</div>
      <nav className="flex-1">
        <ul className="space-y-1">
          <li>
            <Link
              to="/"
              className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            >
              <HomeIcon className="w-5 h-5 mr-4" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/products-list"
              className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            >
              <QueueListIcon className="w-5 h-5 mr-4" /> Products List
            </Link>
          </li>
          <li>
            <Link
              to="/products-statistics"
              className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            >
              <PresentationChartLineIcon className="w-5 h-5 mr-4" /> Products Statistics
            </Link>
          </li>
          <li>
            <Link
              to="/images-list"
              className="flex items-center p-4 hover:bg-gray-100 transition-colors duration-200 rounded-lg"
            >
              <PhotoIcon className="w-5 h-5 mr-4" /> Images List
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="text-center p-4 text-sm text-gray-600 mt-auto">
        © 2024 Data Flux <br />All rights reserved.
      </footer>
    </div>
  );
};

export default Sidebar;
