'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, DollarSign, ChevronDown } from 'lucide-react';

const Deals = () => {
  const [viewMode, setViewMode] = useState('table');
  
  const deals = [
    { id: 1, name: 'Enterprise Software Solution', company: 'Acme Inc.', value: '$75,000', stage: 'Negotiation', probability: 70, closingDate: '2023-07-15' },
    { id: 2, name: 'Marketing Campaign', company: 'Global Solutions', value: '$28,500', stage: 'Proposal', probability: 50, closingDate: '2023-06-30' },
    { id: 3, name: 'IT Infrastructure Upgrade', company: 'EcoTech', value: '$120,000', stage: 'Discovery', probability: 30, closingDate: '2023-08-22' },
    { id: 4, name: 'Annual Maintenance Contract', company: 'MediaWorks', value: '$42,000', stage: 'Closed Won', probability: 100, closingDate: '2023-05-10' },
    { id: 5, name: 'Financial Advisory Services', company: 'Pacific Partners', value: '$55,000', stage: 'Qualification', probability: 40, closingDate: '2023-07-05' },
  ];

  const stages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  const getStageColor = (stage) => {
    switch(stage) {
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      case 'Negotiation': return 'bg-purple-100 text-purple-800';
      case 'Proposal': return 'bg-blue-100 text-blue-800';
      case 'Qualification': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Deals</h1>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                viewMode === 'table' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setViewMode('table')}
            >
              Table
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                viewMode === 'kanban' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'
              }`}
              onClick={() => setViewMode('kanban')}
            >
              Kanban
            </button>
          </div>
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Deal</span>
          </button>
        </div>
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
            placeholder="Search deals..."
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="btn flex items-center space-x-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {viewMode === 'table' ? (
        /* Deals Table View */
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th>DEAL NAME</th>
                <th>COMPANY</th>
                <th>VALUE</th>
                <th>STAGE</th>
                <th>PROBABILITY</th>
                <th>CLOSING DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td>
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="font-medium">{deal.name}</td>
                  <td>{deal.company}</td>
                  <td className="font-medium">{deal.value}</td>
                  <td>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div 
                        className="h-1.5 bg-blue-600 rounded-full" 
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{deal.probability}%</span>
                  </td>
                  <td>{new Date(deal.closingDate).toLocaleDateString()}</td>
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
      ) : (
        /* Deals Kanban View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <div key={stage} className="bg-gray-50 rounded-md p-3 min-h-[300px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">{stage}</h3>
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-gray-200 text-gray-800">
                  {deals.filter(deal => deal.stage === stage).length}
                </span>
              </div>
              
              {deals
                .filter(deal => deal.stage === stage)
                .map(deal => (
                  <div key={deal.id} className="bg-white p-3 rounded-md shadow-sm mb-2 border-l-4 border-blue-500">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800 mb-1">{deal.name}</h4>
                    </div>
                    <p className="text-gray-500 text-xs">{deal.company}</p>
                    <div className="mt-2 flex items-center">
                      <DollarSign className="h-3 w-3 text-green-600 mr-1" />
                      <span className="text-sm font-medium">{deal.value}</span>
                    </div>
                    <div className="mt-1.5 flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {new Date(deal.closingDate).toLocaleDateString()}
                      </div>
                      <span className="text-xs font-medium">{deal.probability}%</span>
                    </div>
                  </div>
                ))
              }
              
              {deals.filter(deal => deal.stage === stage).length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-md h-20 flex items-center justify-center">
                  <p className="text-sm text-gray-400">No deals in this stage</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;