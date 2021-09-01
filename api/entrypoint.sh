#!/bin/bash
set -e

# comment before debag.
echo "Start /api/entrypoint.sh"

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"