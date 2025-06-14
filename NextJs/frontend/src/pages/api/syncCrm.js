export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const response = await fetch('http://localhost:5000/api/syncCrm', {
      method: 'POST',
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API syncCrm error:', error);
    return res.status(500).json({ error: 'Failed to sync orders' });
  }
}
