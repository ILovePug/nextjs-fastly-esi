export default async function handler(req, res) {
  // Read uid from cookie instead of query parameter
  const uid = req.cookies.uid || "guest";
  // Fake cart (could vary by uid in real app)
  const cart = [{ id: "a" }, { id: "b" }];
  const html = `<div class="cart-summary">Cart for ${uid}: ${cart.length} items</div>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "private, max-age=300");
  res.setHeader("Vary", "Cookie");
  res.send(html);
}
