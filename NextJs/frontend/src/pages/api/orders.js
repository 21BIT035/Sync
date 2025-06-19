export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { specific_date, syncOrderId } = req.body;
  let orders = [];

  try {
    const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_CRM_API_SYNC_DATE_ITEMS}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ specific_date }),
    });

    const orderJson = await ordersRes.json();
    orders = orderJson?.data || [];

    if (syncOrderId) {
      const syncRes = await fetch(`${process.env.NEXT_PUBLIC_CRM_API_SYNC_ORDER_ID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment_id: syncOrderId }),
      });

      const syncJson = await syncRes.json();

      if (syncJson && !syncJson.alreadySynced) {
        orders = orders.map((o) =>
          (o.increment_id || o.zaapko_order_id) === syncOrderId
            ? { ...o, crm_synced: true }
            : o
        );
      }
    }

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
