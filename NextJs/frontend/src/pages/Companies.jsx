'use client';
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const CompaniesPage = () => {
  const companies = [
    { id: 1, name: 'Acme Inc.', industry: 'Technology', location: 'New York, USA', employees: 320, status: 'Active' },
    { id: 2, name: 'Global Solutions', industry: 'Consulting', location: 'London, UK', employees: 150, status: 'Active' },
    { id: 3, name: 'EcoTech', industry: 'Energy', location: 'Berlin, Germany', employees: 85, status: 'Inactive' },
    { id: 4, name: 'MediaWorks', industry: 'Marketing', location: 'Toronto, Canada', employees: 63, status: 'Active' },
    { id: 5, name: 'Pacific Partners', industry: 'Finance', location: 'Sydney, Australia', employees: 210, status: 'Active' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search companies..."
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Companies Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="p-4"><input type="checkbox" className="rounded" /></th>
              <th className="p-4">COMPANY NAME</th>
              <th className="p-4">INDUSTRY</th>
              <th className="p-4">LOCATION</th>
              <th className="p-4">EMPLOYEES</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-b hover:bg-gray-50">
                <td className="p-4"><input type="checkbox" className="rounded" /></td>
                <td className="p-4 font-medium">{company.name}</td>
                <td className="p-4">{company.industry}</td>
                <td className="p-4">{company.location}</td>
                <td className="p-4">{company.employees}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {company.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">Previous</button>
          <button className="px-3 py-1 border bg-blue-600 text-white rounded-md">1</button>
          <button className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesPage;
