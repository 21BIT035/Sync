import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { withSessionSsr } from '../../lib/withSession';

const SyncOrders = ({ user, initialDate, initialOrders, initialTotal }) => {
  const [date, setDate] = useState(initialDate || '');
  const [orders, setOrders] = useState(initialOrders || []);
  const [totalOrders, setTotalOrders] = useState(initialTotal || 0);
  const [syncedOrdersCount, setSyncedOrdersCount] = useState(initialOrders?.length || 0);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSync = async () => {
    setLoading(true);

    try {
      if (!date) {
        const syncUrl = `${process.env.NEXT_PUBLIC_CRM_API}syncCrm`;
        const res = await axios.post(syncUrl, {}, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        const syncedData = res.data?.data?.OrderSync || [];

        if (syncedData) {
          setOrders(syncedData);
          setSyncedOrdersCount(syncedData.length);
          toast.success('All orders synced successfully');
        } else {
          toast.error('No new orders to sync.');
        }
        setTotalOrders(syncedData.length);
        setShowPopup(true);
        return;
      }

      const syncByDateUrl = `${process.env.NEXT_PUBLIC_CRM_API}syncCrmByDate`;
      const dateCountUrl = `${process.env.NEXT_PUBLIC_CRM_API}dateItems`;
      const payload = { specific_date: date };

      const [syncRes, countRes] = await Promise.all([
        axios.post(syncByDateUrl, payload, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }),
        axios.post(dateCountUrl, payload, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }),
      ]);

      const syncedData = syncRes.data?.data || [];
      const totalOrdersCount = countRes.data?.total_orders || 0;

      if (syncedData.length === 0) {
        toast.error('No new orders to sync.');
      } else {
        toast.success("Data Synced Successfully");
      }

      setOrders(syncedData);
      setSyncedOrdersCount(syncedData.length);
      setTotalOrders(totalOrdersCount);
      setShowPopup(true);
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync or fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  const handlePopupOk = () => {
    setShowPopup(false);
  };

return (
  <div className="p-6 max-w-6xl mx-auto text-gray-900">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <Link
        href="/ordermanagement"
        className="flex items-center bg-gradient-to-r bg-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-200 text-white px-4 py-2 rounded   mb-4 sm:mb-0"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Go Back
      </Link>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-64"
        />
        <button
          onClick={handleSync}
          className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition duration-200 text-white px-4 py-2 rounded  flex items-center justify-center"
        >
          {loading ? 'Syncing...' : (
            <>
              <RefreshCcw size={16} className="mr-2" /> Sync Orders
            </>
          )}
        </button>
      </div>
    </div>

      {showPopup && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Orders Synced</h2>
            {date && (
              <>
                <p className="mb-2">Newly Synced Orders : <strong>{syncedOrdersCount}</strong></p>
                <p className="mb-2">Old Synced Orders : <strong>{totalOrders - syncedOrdersCount}</strong></p>
                <p className="mb-2">Total Orders on : <strong>{totalOrders}</strong></p>
              </>
            )}
            <button
              onClick={handlePopupOk}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded mt-6">
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 border-b">Order ID</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Item Count</th>
                <th className="px-4 py-2 border-b">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{order.zaapko_order_id || order.increment_id}</td>
                  <td className="px-4 py-2 border-b">
                    {order.order_status === 0 ? 'Pending' : order.order_status}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {order.sales_order_items?.length || 0}
                  </td>
                  <td className="px-4 py-2 border-b">
                    Rp {parseFloat(order.order_grand_total || order.grand_total || 0).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SyncOrders;


export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  const user = req.session.user || null;
  const date = query.date || null;

  let initialOrders = [];
  let totalOrders = 0;

  try {
    if (date) {
      // 1. Sync new orders for a specific date
      const syncByDateRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CRM_API}syncCrmByDate`,
        { specific_date: date },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // 2. Get total orders for that date
      const dateItemsRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CRM_API}dateItems`,
        { specific_date: date },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      initialOrders = syncByDateRes.data?.data || [];
      totalOrders = dateItemsRes.data?.total_orders || 0;
    } else {
      // 3. No date provided → Sync all orders
      const syncAllRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CRM_API}syncCrm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const allSynced = syncAllRes.data?.data?.OrderSync || [];
      initialOrders = allSynced;
      totalOrders = allSynced.length;
    }
  } catch (err) {
    console.error('Server-side sync error:', err.message);
  }

  return {
    props: {
      user,
      initialDate: date || null,
      initialOrders,
      initialTotal: totalOrders,
    },
  };
});
