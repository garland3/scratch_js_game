import http.server as server
server.HTTPServer(('localhost', 8000), server.SimpleHTTPRequestHandler).serve_forever()