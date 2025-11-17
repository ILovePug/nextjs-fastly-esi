vcl 4.0;

backend default {
  .host = "web";
  .port = "3000";
}

# Simple VCL to enable ESI for templates and fetch fragments uncompressed.

sub vcl_recv {
  # Inject a fake uid cookie for testing if none exists
  # This allows you to test ESI immediately without setting cookies manually
  # To test with a real cookie, set it in browser: document.cookie = "uid=alice"
  if (!req.http.Cookie || req.http.Cookie !~ "uid=") {
    if (req.http.Cookie) {
      set req.http.Cookie = req.http.Cookie + "; uid=test-user-123";
    } else {
      set req.http.Cookie = "uid=test-user-123";
    }
  }

  # Normalize URL for easy matching
  if (req.url ~ "^/$") {
    # ensure origin returns uncompressed HTML so we can parse ESI
    unset req.http.Accept-Encoding;
    # mark so backend response can enable ESI
    set req.http.X-EsI = "1";
  }

  # For fragment endpoints, also request uncompressed from origin
  # and pass cookies through (don't cache personalized content)
  if (req.url ~ "^/api/(user-profile|cart-summary)") {
    unset req.http.Accept-Encoding;
    # These are personalized, so bypass cache and pass cookies
    return(pass);
  }

  # page-content is not personalized, can be cached normally
  if (req.url ~ "^/api/page-content") {
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

