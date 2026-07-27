#!/usr/bin/env node

/**
 * Fail the build if a vulnerable next-mdx-remote version is installed.
 * Vercel blocks CVE-2026-0969 (versions 4.3.0 through 5.0.0).
 */

const { existsSync, readFileSync } = require("fs");
const { join } = require("path");

const pkgPath = join(process.cwd(), "node_modules", "next-mdx-remote", "package.json");

if (!existsSync(pkgPath)) {
  console.log("✓ next-mdx-remote is not installed");
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const version = pkg.version || "0.0.0";
const major = parseInt(version.split(".")[0], 10);

if (major < 6) {
  console.error(
    `\n✗ Vulnerable next-mdx-remote@${version} detected in node_modules.\n` +
      `  Remove the package or upgrade to >= 6.0.0.\n` +
      `  See: https://vercel.link/CVE-2026-0969\n`
  );
  process.exit(1);
}

console.log(`✓ next-mdx-remote@${version} is safe`);
