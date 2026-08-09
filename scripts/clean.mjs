import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";

for (const target of ["dist", "server.js"]) {
  if (existsSync(target)) {
    await rm(target, { recursive: true, force: true });
  }
}
