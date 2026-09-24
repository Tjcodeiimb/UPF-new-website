#!/bin/bash
# Development server for UpForge website
# Usage: ./dev-server.sh or bash dev-server.sh

PORT=${1:-8000}

echo "🚀 Starting UpForge development server..."
echo "📍 Visit: http://localhost:$PORT"
echo "📁 Serving from: $(pwd)"
echo ""
echo "💡 Tips:"
echo "   - Edit files in your text editor"
echo "   - Refresh browser (Cmd+R or Ctrl+R) to see changes"
echo "   - Keep this server running in background"
echo "   - Press Ctrl+C to stop server"
echo ""

python3 -m http.server $PORT --bind 127.0.0.1
