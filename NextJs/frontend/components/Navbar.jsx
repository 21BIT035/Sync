'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Settings, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const pathname = usePathname();

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeProfile = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeProfile);
    return () => document.removeEventListener('mousedown', closeProfile);
  }, []);

  const getPageTitle = () => {
    if (pathname === '/' || pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/ordermanagement') return 'ORDER MANAGEMENT';
    if (pathname === '/companies') return 'Companies';
    if (pathname === '/contacts') return 'Contacts';
    if (pathname === '/deals') return 'Deals';
    if (pathname === '/addproduct') return 'Add New Product';
    if (pathname === '/syncorders') return 'SYNC ORDERS';
    return 'ZACRM'; 
  };

  return (
    <header className="shadow-md bg-red-600">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-white text-2xl font-bold tracking-widest">
            <Link href="/">ZACRM</Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none ml-20">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden md:flex space-x-8 text-white">
            <Link href="/" className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300">Home</Link>
            <Link href="/ordermanagement" className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300">Orders</Link>
            <Link href="/Contacts" className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300">Contacts</Link>
            <Link href="/companies" className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300">Companies</Link>
            <Link href="/deals" className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300">Deals</Link>
            {/* <Link href="/syncorders" className="relative hover:after:w-full after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300">Sync</Link> */}
          </div>

          <div className="relative" ref={profileRef}>
            <button onClick={toggleProfile} className="text-white hover:text-gray-200 hidden md:block">
              Profile
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button className="dropdown-item flex items-center px-4 py-2 w-full hover:bg-gray-100">
                  <User className="w-4 h-4 mr-2" /> Profile
                </button>
                <button className="dropdown-item flex items-center px-4 py-2 w-full hover:bg-gray-100">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </button>
                <button className="dropdown-item flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100">
                  <LogOut className="w-4 h-4 mr-2" /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col space-y-2 text-white">
            <Link href="/" className="block">Home</Link>
            <Link href="/ordermanagement" className="block">Orders</Link>
            <Link href="/contacts" className="block">Contacts</Link>
            <Link href="/companies" className="block">Companies</Link>
            <Link href="/deals" className="block">Deals</Link>
            <button onClick={toggleProfile} className="text-left mt-2">Profile</button>
            {profileOpen && (
              <div className="bg-white rounded-md shadow-lg text-black py-2 mt-1">
                <button className="block px-4 py-2 w-full hover:bg-gray-100">
                  <User className="w-4 h-4 inline mr-2" /> Profile
                </button>
                <button className="block px-4 py-2 w-full hover:bg-gray-100">
                  <Settings className="w-4 h-4 inline mr-2" /> Settings
                </button>
                <button className="block px-4 py-2 w-full text-red-600 hover:bg-gray-100">
                  <LogOut className="w-4 h-4 inline mr-2" /> Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white py-2 px-4 sm:px-6 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800 tracking-widest">{getPageTitle()}</h1>
      </div>
    </header>
  );
};

export default Navbar;
