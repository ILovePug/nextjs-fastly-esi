import React from 'react'
import ReactDOMServer from 'react-dom/server'

function UserProfile({ name }) {
  return (
    <div className="user-profile">
      Hello, {name}!
    </div>
  )
}

export default async function handler(req, res) {
  const uid = req.query.uid || '123'
  // Fake DB lookup
  const user = { id: uid, name: `User-${uid}` }
  const html = ReactDOMServer.renderToString(<UserProfile name={user.name} />)

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'private, max-age=3600')
  res.setHeader('Vary', 'Cookie')
  // Send uncompressed fragment body
  res.send(html)
}

