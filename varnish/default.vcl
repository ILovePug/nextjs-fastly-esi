vcl 4.0;

backend default {
  .host = "web";
  .port = "3000";
}

# Simple VCL to enable ESI for templates and fetch fragments uncompressed.

sub vcl_recv {
  # Normalize URL for easy matching
  if (req.url ~ "^/$") {
    # ensure origin returns uncompressed HTML so we can parse ESI
    unset req.http.Accept-Encoding;
    # mark so backend response can enable ESI
    set req.http.X-EsI = "1";
  }

  # For fragment endpoints, also request uncompressed from origin
  if (req.url ~ "^/api/(user-profile|cart-summary|page-content)") {
    unset req.http.Accept-Encoding;
  }
}

sub vcl_backend_response {
  # If the request asked for ESI parsing, enable it on the backend response
  if (bereq.http.X-EsI == "1") {
    set beresp.do_esi = true;
  }

  # Basic caching rules: cache template for 60s, fragments use their own headers
  if (bereq.url == "/") {
    set beresp.ttl = 60s;
    set beresp.grace = 30s;
  }
}

sub vcl_deliver {
  # nothing fancy here; Varnish will deliver the merged HTML
}

