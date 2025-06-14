export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    console.log("Entering synccrm...");
    const response = await fetch('http://localhost:5000/api/dateItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Failed to fetch data' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('API dateItems error:', error);
    return res.status(500).json({ error: 'Failed to fetch orders by date' });
  }
}
