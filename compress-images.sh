#!/usr/bin/env bash
# Resize + compress images into images/optimized/<name>-{600,1200}.jpg
# Uses sips (built into macOS) - no external deps.
# Upgrade path: install webp (brew install webp) and switch OUT_EXT to webp + use cwebp.
#
# Usage: ./compress-images.sh          # all images in images/
#        ./compress-images.sh path.jpg # single file

set -euo pipefail

SRC_DIR="images"
OUT_DIR="images/optimized"
WIDTHS=(600 1200)
QUALITY=72          # JPEG 1–100; 72–80 is the sweet spot
OUT_EXT="jpg"

mkdir -p "$OUT_DIR"

process() {
  local src="$1"
  local base name w out tmp
  base=$(basename "$src")
  name="${base%.*}"
  for w in "${WIDTHS[@]}"; do
    out="$OUT_DIR/${name}-${w}.${OUT_EXT}"
    if [[ -f "$out" && "$out" -nt "$src" ]]; then
      echo "skip  $out"
      continue
    fi
    # sips --resampleWidth preserves aspect ratio
    sips \
      --resampleWidth "$w" \
      -s format jpeg \
      -s formatOptions "$QUALITY" \
      "$src" --out "$out" >/dev/null
    printf "done  %s (%s)\n" "$out" "$(du -h "$out" | cut -f1)"
  done
}

if [[ $# -gt 0 ]]; then
  process "$1"
else
  while IFS= read -r -d '' src; do
    process "$src"
  done < <(find "$SRC_DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.heic' \) -print0)
fi

echo ""
echo "Total:"
du -sh "$SRC_DIR" "$OUT_DIR" 2>/dev/null | awk '{printf "  %-40s %s\n", $2, $1}'
