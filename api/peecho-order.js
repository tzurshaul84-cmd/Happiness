export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId, sourceUrl, pageCount, markup, merchantApiKey, secretKey } = req.body;

  try {
    const response = await fetch('https://www.peecho.com/api/v3/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Api-Key': merchantApiKey,
        'X-Secret-Key': secretKey
      },
      body: JSON.stringify({
        productId,
        sourceUrl,
        pageCount,
        markup
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
