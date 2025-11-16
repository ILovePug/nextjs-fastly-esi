export default async function handler(req, res) {
  const path = req.query.path || '/'
  const html = `<div class="page-content">Content for path: ${path}</div>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=300')
  res.send(html)
}

