import { promises as fs } from "node:fs";
import path from "node:path";

const buildOutputDir = path.resolve(".open-next");
const workerEntry = path.join(buildOutputDir, "worker.js");
const pagesWorkerEntry = path.join(buildOutputDir, "_worker.js");
const routesFile = path.join(buildOutputDir, "_routes.json");

async function ensureFileExists(filePath, description) {
  try {
    await fs.access(filePath);
  } catch (error) {
    throw new Error(`Cannot prepare Cloudflare Pages deployment because the ${description} is missing at ${filePath}`);
  }
}

async function writeWorkerShim() {
  const shim = `import worker, { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./worker.js";\n\nexport default worker;\nexport { DOQueueHandler, DOShardedTagCache, BucketCachePurge };\n`;
  await fs.writeFile(pagesWorkerEntry, shim, "utf8");
}

async function writeRoutesManifest() {
  const routes = {
    version: 1,
    include: ["/*"],
    exclude: [
      "/_next/static/*",
      "/_next/image*",
      "/_next/data/*",
      "/favicon.ico",
      "/robots.txt"
    ]
  };

  const contents = `${JSON.stringify(routes, null, 2)}\n`;
  await fs.writeFile(routesFile, contents, "utf8");
}

async function main() {
  await ensureFileExists(workerEntry, "OpenNext worker bundle");
  await writeWorkerShim();
  await writeRoutesManifest();
  console.log("Prepared Cloudflare Pages worker entry and routes manifest.");
}

await main();
