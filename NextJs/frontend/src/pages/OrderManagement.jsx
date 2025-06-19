import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CalendarDays } from 'lucide-react';
import { withSessionSsr } from '../../lib/withSession';
import { useRef } from 'react';


export default function OrderManagement({ orders: initialOrders = [], date: initialDate = '', syncedOrderId = '' }) {
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState(initialOrders);
  const [date, setDate] = useState(initialDate);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const hasShownToast = useRef(false);


  useEffect(() => {
    setOrders(
      search
        ? initialOrders.filter(o =>
            (o.increment_id || o.zaapko_order_id || '')
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        : initialOrders
    );
  }, [search, initialOrders]);



useEffect(() => {
  if (syncedOrderId && !hasShownToast.current) {
    hasShownToast.current = true;
    toast.success(`Order ${syncedOrderId} synced successfully`);
    const url = new URL(window.location.href);
    url.searchParams.delete('syncOrderId');
    window.history.replaceState({}, '', url.toString());
  }
}, [syncedOrderId]);



  const handleDisplay = () => {
    setDisplayLoading(true);
    setTimeout(() => window.location.href = `/ordermanagement?date=${date}`, 1000);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => o.increment_id || o.zaapko_order_id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const handleSyncOrder = (orderId) => {
    window.location.href = `/ordermanagement?date=${date}&syncOrderId=${orderId}`;
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6 text-gray-900">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Order ID"
          className="border border-gray-300 rounded px-4 py-2 sm:w-64 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={handleDisplay}
            disabled={displayLoading}
            className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition"
          >
            {displayLoading ? (
              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="animate-spin" /> Displaying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CalendarDays size={16} /> Display
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Item Count</th>
                <th className="p-4">Grand Total</th>
                <th className="p-4">Sync Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 p-6">No orders found</td>
                </tr>
              ) : (
                orders.map((order, i) => {
                  const orderId = order.increment_id || order.zaapko_order_id;
                  const synced = order.crm_synced || order.is_synced;
                  return (
                    <tr key={i} className="border-t">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(orderId)}
                          onChange={() => handleCheckboxChange(orderId)}
                        />
                      </td>
                      <td className="p-4">{orderId}</td>
                      <td className="p-4 capitalize">{order.status}</td>
                      <td className="px-4 py-2 border-b">{order.sales_order_items?.length || 0}</td>
                      <td className="p-4">Rp {parseFloat(order.grand_total || 0).toFixed(2)}</td>
                      <td className="p-4">
                        {synced ? (
                          <span className="text-green-600 font-medium text-sm">Synced</span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedOrderId(orderId);
                              setShowPopup(true);
                            }}
                            className="text-red-600 font-medium text-sm"
                          >
                            Not Synced
                          </button>
                        )}
                      </td>
                      <td className="p-4">
                        <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Sync to CRM</h2>
            <p className="mb-4">Do you want to sync this order to CRM?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowPopup(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleSyncOrder(selectedOrderId)}
                disabled={syncing}
              >
                {syncing ? 'Syncing...' : 'Yes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ query }) => {
  const date = query.date || new Date().toISOString().slice(0, 10);
  const syncOrderId = query.syncOrderId || null;
   
  try {
    console.log("Entering Props....");
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ specific_date: date, syncOrderId }),
    });

    const result = await res.json();
    const orders = result.orders || [];

    return {
      props: {
        orders,
        date,
        syncedOrderId: syncOrderId || '',
      },
    };
  } catch (err) {
    console.error('SSR Fetch Error:', err);
    return { props: { orders: [], date, syncedOrderId: '' } };
  }
});
