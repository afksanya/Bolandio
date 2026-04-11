#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Create venv if not exists
if [ ! -d "$SCRIPT_DIR/.venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv "$SCRIPT_DIR/.venv"
fi

# Install dependencies
echo "Installing dependencies..."
"$SCRIPT_DIR/.venv/bin/pip" install -q -r "$SCRIPT_DIR/backend/requirements.txt"

echo ""
echo "======================================"
echo "  全球电台 启动成功！"
echo "  本机访问: http://localhost:8080"
echo "  手机访问: http://$(ipconfig getifaddr en0 2>/dev/null || hostname -I | awk '{print $1}'):8080"
echo "  (确保手机和电脑在同一WiFi下)"
echo "======================================"
echo ""

cd "$SCRIPT_DIR/backend"
"$SCRIPT_DIR/.venv/bin/uvicorn" main:app --host 0.0.0.0 --port 8080 --reload
