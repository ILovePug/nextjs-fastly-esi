FROM varnish:6.6

COPY default.vcl /etc/varnish/default.vcl

CMD ["varnishd", "-F", "-f", "/etc/varnish/default.vcl", "-a", ":80", "-p", "http_resp_size=65536"]

