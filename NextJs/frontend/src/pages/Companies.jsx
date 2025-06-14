import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const Companies = () => {
  const companies = [
    { id: 1, name: 'Acme Inc.', industry: 'Technology', location: 'New York, USA', employees: 320, status: 'Active' },
    { id: 2, name: 'Global Solutions', industry: 'Consulting', location: 'London, UK', employees: 150, status: 'Active' },
    { id: 3, name: 'EcoTech', industry: 'Energy', location: 'Berlin, Germany', employees: 85, status: 'Inactive' },
    { id: 4, name: 'MediaWorks', industry: 'Marketing', location: 'Toronto, Canada', employees: 63, status: 'Active' },
    { id: 5, name: 'Pacific Partners', industry: 'Finance', location: 'Sydney, Australia', employees: 210, status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Companies</h1>
        <button className="mt-3 sm:mt-0 btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Company</span>
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
            placeholder="Search companies..."
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="btn flex items-center space-x-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Companies Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="w-10">
                <input type="checkbox" className="rounded" />
              </th>
              <th>COMPANY NAME</th>
              <th>INDUSTRY</th>
              <th>LOCATION</th>
              <th>EMPLOYEES</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td>
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="font-medium">{company.name}</td>
                <td>{company.industry}</td>
                <td>{company.location}</td>
                <td>{company.employees}</td>
                <td>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {company.status}
                  </span>
                </td>
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

export default Companies;