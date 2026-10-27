#!/bin/bash
# Sweep all /preview slugs derived the same way lib/site-preview.ts does:
# section → product → example, slug = productId-slugify(label)
set -u
cd /home/z/my-project
node -e '
const fs = require("fs");
const src = fs.readFileSync("data/exampleProducts.ts", "utf8");
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "example";
let product = null;
const slugs = [];
const re = /id: "([a-z-]+)"|mkExample\("([a-z]+)", "([^"]+)"/g;
let m;
while ((m = re.exec(src))) {
  if (m[1]) { product = m[1]; }
  else if (m[3] && product) { slugs.push(product + "-" + slugify(m[3])); }
}
fs.writeFileSync("/tmp/all-slugs.txt", slugs.join("\n"));
console.log("derived", slugs.length, "slugs");
'
total=0; fail=0
while read -r s; do
  [ -z "$s" ] && continue
  total=$((total+1))
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "http://localhost:3000/preview/$s")
  if [ "$code" != "200" ]; then fail=$((fail+1)); echo "FAIL $code $s"; fi
done < /tmp/all-slugs.txt
echo "swept $total slugs, $fail failures"
