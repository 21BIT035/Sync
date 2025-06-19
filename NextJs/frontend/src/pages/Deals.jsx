'use client';
import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Calendar, Building, CircleDot } from 'lucide-react';

const SingleDealPage = () => {
  const [deals] = useState([
    {
      id: 1,
      name: 'Enterprise Software Solution',
      company: 'Acme Inc.',
      value: '$75,000',
      stage: 'Negotiation',
      probability: 70,
      closingDate: '2023-07-15',
    },
    {
      id: 2,
      name: 'Cognito Career Solution',
      company: 'TechWorks Ltd.',
      value: '$95,000',
      stage: 'Proposal',
      probability: 85,
      closingDate: '2023-08-25',
    },
    {
      id: 3,
      name: 'Cloud Security Services',
      company: 'CloudPro Solutions',
      value: '$120,000',
      stage: 'Qualification',
      probability: 60,
      closingDate: '2023-09-10',
    },
  ]);

  const [showPage, setShowPage] = useState(true);

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Closed Won': return 'text-green-600';
      case 'Closed Lost': return 'text-red-600';
      case 'Negotiation': return 'text-purple-600';
      case 'Proposal': return 'text-blue-600';
      case 'Qualification': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {showPage ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setShowPage(false)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Deals
          </button>

          {/* Deal Cards List */}
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-md p-6 space-y-6 hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{deal.name}</h2>
                <p className="text-sm text-gray-500">Deal ID: #{deal.id}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building className="text-gray-500 w-5 h-5" />
                  <span className="text-gray-700 font-medium">{deal.company}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="text-green-500 w-5 h-5" />
                  <span className="text-gray-700 font-semibold">{deal.value}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <CircleDot className={`${getStageColor(deal.stage)} w-5 h-5`} />
                  <span className="text-gray-700">{deal.stage}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-500 w-5 h-5" />
                  <span className="text-gray-700">
                    {new Date(deal.closingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Probability to Close</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
                <p className="text-xs mt-1 text-gray-500">{deal.probability}% chance to close</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>You are now back to deals list (simulate here).</p>
          <button
            onClick={() => setShowPage(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            View Deals Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleDealPage;
