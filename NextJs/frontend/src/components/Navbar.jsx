'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Settings, LogOut } from 'lucide-react';

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
    if (pathname.includes('/ordermanagement')) return 'ORDER MANAGEMENT';
    if (pathname.includes('/contacts')) return 'CONTACTS';
    if (pathname.includes('/companies')) return 'COMPANIES';
    if (pathname.includes('/deals')) return 'DEALS';
    return '';
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ordermanagement', label: 'Orders' },
    { href: '/contacts', label: 'Contacts' },
    { href: '/companies', label: 'Companies' },
    { href: '/deals', label: 'Deals' },
  ];

  return (
    <>
      <nav className="bg-red-600 text-white sticky top-0 z-[999] px-5 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <div className="mr-auto text-2xl font-semibold tracking-widest">
              <Link href="/">ZACRM</Link>
          </div>
          {/* Hamburger and Profile Row */}
          <div className="flex items-center gap-4 md:hidden">
            <div onClick={toggleMenu} className="flex flex-col gap-1 cursor-pointer">
              <span className="h-[3px] w-6 bg-white"></span>
              <span className="h-[3px] w-6 bg-white"></span>
              <span className="h-[3px] w-6 bg-white"></span>
            </div>
          </div>

{/* Desktop Links */}
<div className="hidden md:flex items-center gap-8">
  {navLinks.map(({ href, label }) => {
    const isActive = href !== '/' && (pathname === href || pathname.includes(href));
    return (
      <Link
        key={href}
        href={href}
        className={`
          relative py-1 text-white 
          after:absolute after:left-0 after:bottom-0 
          after:h-[3px] after:bg-white after:transition-all after:duration-300
          ${isActive ? 'font-semibold after:w-full' : 'after:w-0 hover:after:w-full'}
        `}
      >
        {label}
      </Link>
    );
  })}
</div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="container mx-auto mt-3 flex flex-col gap-2 bg-red-500 rounded-lg px-4 py-3 shadow md:hidden">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block text-white text-center py-1 hover:underline underline-offset-4 transition duration-200 ${
                  pathname === href || pathname.includes(href) ? 'font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Page Header */}
      {getPageTitle() && (
        <div className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
