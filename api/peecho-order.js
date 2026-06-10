export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { productId, sourceUrl, pageCount, markup, merchantApiKey } = req.body;
  try {
    const response = await fetch('https://www.peecho.com/rest/v3/order/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'merchantApiKey': merchantApiKey },
      body: JSON.stringify({ productId, pageCount, markup, file_details: { source_url: sourceUrl } })
    });
    const text = await response.text();
    try { return res.status(200).json(JSON.parse(text)); }
    catch(e) { return res.status(200).json({ raw: text, status: response.status }); }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
