export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { productId, sourceUrl, pageCount, markup, merchantApiKey, secretKey } = req.body;

  try {
    const response = await fetch('https://www.peecho.com/rest/v3/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'merchantApiKey': merchantApiKey
      },
      body: JSON.stringify({
        productId: productId,
        pageCount: pageCount,
        markup: markup,
        file_details: {
          source_url: sourceUrl
        }
      })
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch(e) {
      return res.status(200).json({ raw: text, status: response.status });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
