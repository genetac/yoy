// TS template-literal escaping sanity check (scratch, not shipped)
const t1 = `a\d b\\d c\`d e\${f} g${1 + 1}h`;
console.log(JSON.stringify(t1));
console.log("len(`\\d`) =", `\d`.length, " len(`\\\\d`) =", `\\d`.length);

// csv helper check (same shape as the module will use)
const csv = (rows: (string | number)[][]): string =>
  rows
    .map((r) =>
      r
        .map((cell) => {
          const s = String(cell);
          return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
        })
        .join(",")
    )
    .join("\n") + "\n";

const rows = [
  ["pattern", "flags", "test_input", "expected_matches"],
  ["\\d+", "g", "Room 12A, floor 7", 3],
  ["ok\\nERR", "gm", "a,b", 2],
  ['q"x', "g", "plain", 1],
];
console.log(csv(rows));
