# Next.js + Varnish (ESI) Example

This repo demonstrates how to use Edge Side Includes (ESI) with a Next.js Page Router app and Varnish to simulate Fastly locally.

### What this does

- `web` runs Next.js dev server on port 3000
- `varnish` runs Varnish on port 8080, proxied to Next.js
- Browse to http://localhost:8080 to see the ESI-assembled page

### Start locally

```bash
docker-compose up --build
```

### What to test

* Visit `http://localhost:8080/` — Varnish will fetch the template from Next.js, parse ESI tags and fetch the fragments, stitch them and return the final HTML gzipped to the browser.

* The fragments are:
  * `/api/user-profile?uid=123`
  * `/api/cart-summary?uid=123`
  * `/api/page-content?path=/` (per-page fragment)

### Notes

* This setup is for development and demonstration. For production Fastly you will use Fastly VCL snippets and service configuration instead of Varnish.

* Varnish here simulates the important Fastly behaviors: strip Accept-Encoding for ESI parsing, `beresp.do_esi = true`, and stitching fragments.

