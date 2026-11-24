import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const warning =
  "WARNING: Do not step on any butterflies. One wrong step and you'll come home to a timeline without Wi-Fi.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, warning, "utf8");

const roundTrip = readFileSync(target, "utf8");
if (roundTrip !== warning || roundTrip.endsWith("\n")) {
  throw new Error("entry.txt does not match the warning line exactly");
}
if (warning.length > 120) {
  throw new Error(`warning line is ${warning.length} characters, over the 120 limit`);
}
console.log(
  `Wrote ${target}: ${warning.length} characters, no trailing newline.`,
);
