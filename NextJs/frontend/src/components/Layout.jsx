import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;