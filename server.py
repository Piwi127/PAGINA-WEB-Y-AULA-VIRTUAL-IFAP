#!/usr/bin/env python3
"""
Servidor web simple en Python para el proyecto IFAP
"""

import http.server
import socketserver
import os
from urllib.parse import unquote

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Decodificar la URL
        self.path = unquote(self.path)
        return super().do_GET()

    def log_message(self, format, *args):
        # Personalizar el log para mostrar solo información relevante
        print(f"[{self.log_date_time_string()}] {self.address_string()} - {format % args}")

def run_server(port=8000):
    """Ejecuta el servidor en el puerto especificado"""
    os.chdir(os.path.dirname(__file__))  # Cambiar al directorio del script

    with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
        print(f"Servidor web iniciado en http://localhost:{port}")
        print(f"Presiona Ctrl+C para detener el servidor")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
            httpd.shutdown()

if __name__ == "__main__":
    import sys
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Uso: python server.py [puerto]")
            sys.exit(1)

    run_server(port)
