#!/bin/bash
# Make the website copies of one artwork photo, the same way as every other piece:
# web sizes (1920 px and 900 px), photo data removed (camera, location), and the
# site's color boost (saturation 120 = the "Richer" look chosen in October 2026).
# The original photo is never changed.
#
# Usage:  tools/prepare-image.sh /path/to/original.jpg name
#   e.g.  tools/prepare-image.sh ~/Desktop/tidewater.jpeg tidewater
# Then add a row for "name" to WORKS in shared/content.js using the w, h and tone printed below.
set -euo pipefail
cd "$(dirname "$0")/.."
src="$1"; name="$2"; boost=120
magick "$src" -auto-orient -strip -modulate 100,$boost,100 -resize '1920x1920>' -interlace Plane -quality 84 "images/full/$name.jpg"
magick "$src" -auto-orient -strip -modulate 100,$boost,100 -resize '900x900>'  -interlace Plane -quality 80 "images/thumb/$name.jpg"
magick identify -format 'w: %w, h: %h, ' "images/full/$name.jpg"
magick "images/full/$name.jpg" -resize '1x1!' -format 'tone: "#%[hex:p{0,0}]"\n' info:
