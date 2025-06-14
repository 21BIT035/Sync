'use client';
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const Contacts = () => {
  const contacts = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '+1 (555) 123-4567', company: 'Acme Inc.', title: 'Sales Manager' },
    { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', phone: '+1 (555) 987-6543', company: 'Global Solutions', title: 'Marketing Director' },
    { id: 3, name: 'Michael Brown', email: 'm.brown@example.com', phone: '+1 (555) 456-7890', company: 'EcoTech', title: 'CEO' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.w@example.com', phone: '+1 (555) 789-0123', company: 'MediaWorks', title: 'Account Manager' },
    { id: 5, name: 'David Lee', email: 'david.lee@example.com', phone: '+1 (555) 234-5678', company: 'Pacific Partners', title: 'Financial Analyst' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Contacts</h1>
        <button className="mt-3 sm:mt-0 btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search contacts..."
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="btn flex items-center space-x-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Contacts Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>COMPANY</th>
              <th>TITLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td>
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="font-medium">{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.company}</td>
                <td>{contact.title}</td>
                <td>
                  <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
        </div>
        
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border bg-primary-500 text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;