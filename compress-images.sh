#!/usr/bin/env bash
# Resize + compress MENU photos into images/optimized/<name>-{600,1200}.jpg
# Scope: only files you pass explicitly as arguments. No "all images" default —
# hero/logo/halal/formats/advantages photos are NOT meant to go through this.
# Uses sips (built into macOS) — no external deps.
#
# Usage: ./compress-images.sh images/Канапе\ с\ казылыком.jpeg
#        ./compress-images.sh images/Канапе*.jpeg  images/Брускетта*.jpeg

set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <menu-image-path> [more paths...]" >&2
  echo "Pass specific menu photos only. Wildcards OK." >&2
  exit 1
fi

OUT_DIR="images/optimized"
WIDTHS=(600 1200)
QUALITY=72
OUT_EXT="jpg"

mkdir -p "$OUT_DIR"

for src in "$@"; do
  [[ -f "$src" ]] || { echo "skip (not a file): $src" >&2; continue; }
  base=$(basename "$src")
  name="${base%.*}"
  for w in "${WIDTHS[@]}"; do
    out="$OUT_DIR/${name}-${w}.${OUT_EXT}"
    if [[ -f "$out" && "$out" -nt "$src" ]]; then
      echo "skip  $out"
      continue
    fi
    sips \
      --resampleWidth "$w" \
      -s format jpeg \
      -s formatOptions "$QUALITY" \
      "$src" --out "$out" >/dev/null
    printf "done  %s (%s)\n" "$out" "$(du -h "$out" | cut -f1)"
  done
done
