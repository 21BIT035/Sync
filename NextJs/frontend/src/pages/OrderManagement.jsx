import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { withSessionSsr } from '../../lib/withSession';

const OrderManagement = ({ ordersItem = [], totalOrdersCount = 0, date: serverDate }) => {
  const [orders, setOrders] = useState(ordersItem);
  const [date, setDate] = useState(serverDate || "");
  const [displayLoading, setDisplayLoading] = useState(false);
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupOrderId, setPopupOrderId] = useState(null);
  const [syncLoading, setSyncLoading] = useState(false);
  const [totalOrderCount, setTotalOrderCount] = useState(totalOrdersCount || 0);

  const displayOrders = async (triggerPopup = false) => {
    if (!date) return;
    setDisplayLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CRM_API}dateItems`,
        { specific_date: date },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data?.data || [];
      const sorted = data.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
      setOrders(sorted);
      setTotalOrderCount(res.data?.total_orders || 0);

      if (triggerPopup) {
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Date fetch failed:", err);
      toast.error("Failed to fetch orders by date");
    } finally {
      setDisplayLoading(false);
    }
  };

  const handlePopupYes = async () => {
    if (!popupOrderId) return;
    setSyncLoading(true);

    try {
      const endpoint = `${process.env.NEXT_PUBLIC_CRM_API}syncOrderById`;
      const res = await axios.post(
        endpoint,
        { increment_id: popupOrderId },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.alreadySynced) {
        toast.success("Order is already synced");
      } else {
        toast.success("Synced successfully");
      }

      setOrders((prev) =>
        prev.map((o) =>
          o.zaapko_order_id === popupOrderId || o.increment_id === popupOrderId
            ? { ...o, crm_synced: true }
            : o
        )
      );
    } catch (err) {
      console.error("Sync failed:", err);
      toast.error("Failed to sync order");
    } finally {
      setSyncLoading(false);
      setPopupOrderId(null);
      setShowPopup(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    (order?.zaapko_order_id || order?.increment_id || "")
      .toLowerCase()
      .includes(orderIdFilter.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 text-gray-900 relative">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={orderIdFilter}
          onChange={(e) => setOrderIdFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full sm:w-64"
        />

        <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full sm:w-40"
          />
          <button
            onClick={() => displayOrders(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center w-full sm:w-auto"
            disabled={displayLoading}
          >
            {displayLoading ? "Displaying..." : (
              <>
                <CalendarDays size={16} className="mr-2" /> Display
              </>
            )}
          </button>
        </div>
      </div>

      {showPopup && popupOrderId && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Sync Order</h2>
            <p className="mb-4">Do you want to sync this order to CRM?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePopupYes}
                disabled={syncLoading}
                className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${syncLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {syncLoading ? "Syncing..." : "Yes"}
              </button>
              <button
                onClick={() => {
                  setPopupOrderId(null);
                  setShowPopup(false);
                }}
                disabled={syncLoading}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded overflow-x-auto shadow-sm max-h-[500px]">
        <table className="w-full min-w-[700px] text-sm text-left text-gray-900">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border-b">Order ID</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Item Count</th>
              <th className="px-4 py-2 border-b">Grand Total</th>
              <th className="px-4 py-2 border-b">Sync Status</th>
              <th className="px-4 py-2 text-center border-b">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, idx) => {
                const synced = order.crm_synced || order.is_synced;
                const orderId = order.zaapko_order_id || order.increment_id;

                return (
                  <tr key={idx} className="hover:bg-indigo-50 transition-colors duration-150">
                    <td className="px-4 py-2 border-b">{orderId}</td>
                    <td className="px-4 py-2 border-b">
                      {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Unknown"}
                    </td>
                    <td className="px-4 py-2 border-b">{order.sales_order_items?.length || 0}</td>
                    <td className="px-4 py-2 border-b">Rp {parseFloat(order.grand_total || 0).toFixed(2)}</td>
                    <td className="px-4 py-2 border-b">
                      {synced ? (
                        <span className="text-green-600 font-medium">Synced</span>
                      ) : (
                        <button
                          onClick={() => {
                            setPopupOrderId(orderId);
                            setShowPopup(true);
                          }}
                          className="text-red-600 underline hover:text-red-700"
                        >
                          Not Synced
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      <button className="bg-purple-500 text-white px-4 py-1.5 rounded hover:bg-purple-600">
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
  );
};

export default OrderManagement;

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  const user = req.session.user || null;
  const date = query.date || null;

  let initialOrders = [];
  let totalOrders = 0;

  try {
    if (date) {
      const res = await axios.post(
        `http://localhost:5000/api/dateItems`,
        { specific_date: date },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data?.data) {
        initialOrders = res.data.data;
        totalOrders = res.data.total_orders || 0;
      }
    }
  } catch (err) {
    console.error('Error fetching dateItems:', err.message);
  }

  return {
    props: {
      user,
      ordersItem: initialOrders,
      totalOrdersCount: totalOrders,
      date: date || "",
    },
  };
});
