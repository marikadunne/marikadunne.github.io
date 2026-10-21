#!/bin/bash
# Publish the site: stamp a new version on the page's files (so visitors' browsers
# load the new copies right away instead of a saved older one), then commit and push.
# Usage: ./publish.sh "What changed"
set -euo pipefail
cd "$(dirname "$0")"
msg="${1:-Update site}"
v=$(date +%Y%m%d%H%M%S)
sed -i '' -E "s/\?v=[0-9]+/?v=$v/g" index.html shared/content.js
git add -A
git commit -q -m "$msg"
git push -q
echo "Published ($v). The live site updates in about a minute."
