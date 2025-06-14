'use client';
import React from 'react';
import Image from 'next/image';
import { CreditCard, TrendingUp, Users, ShoppingBag } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$128,430',
    icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    bg: 'bg-blue-100',
  },
  {
    title: 'Open Deals',
    value: '23',
    icon: <TrendingUp className="h-6 w-6 text-green-600" />,
    bg: 'bg-green-100',
  },
  {
    title: 'New Contacts',
    value: '42',
    icon: <Users className="h-6 w-6 text-yellow-600" />,
    bg: 'bg-yellow-100',
  },
  {
    title: 'Total Orders',
    value: '156',
    icon: <ShoppingBag className="h-6 w-6 text-purple-600" />,
    bg: 'bg-purple-100',
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-lg transition-shadow p-4 rounded-xl flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Sales Overview</h2>
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/7947541/pexels-photo-7947541.jpeg"
            alt="Product Sales Overview"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
