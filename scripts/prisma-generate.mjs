import { spawnSync } from "node:child_process";
const command = process.platform === "win32" ? "npx.cmd" : "npx";
const env = { ...process.env, DATABASE_URL: process.env.DATABASE_URL || "postgresql://optikart:optikart@localhost:5432/optikart", DIRECT_URL: process.env.DIRECT_URL || "postgresql://optikart:optikart@localhost:5432/optikart" };
const result = spawnSync(command, ["prisma", "generate"], { stdio: "inherit", env });
if (result.error) { console.error(result.error); process.exit(1); }
process.exit(result.status ?? 1);
