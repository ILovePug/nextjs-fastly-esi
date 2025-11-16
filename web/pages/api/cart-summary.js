export default async function handler(req, res) {
  const uid = req.query.uid || '123'
  // Fake cart
  const cart = [{ id: 'a' }, { id: 'b' }]
  const html = `<div class="cart-summary">Cart items: ${cart.length}</div>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'private, max-age=300')
  res.setHeader('Vary', 'Cookie')
  res.send(html)
}

