import { promises as fs } from "node:fs";
import path from "node:path";

const buildOutputDir = path.resolve(".open-next");
const workerEntry = path.join(buildOutputDir, "worker.js");
const pagesWorkerEntry = path.join(buildOutputDir, "_worker.js");
const routesFile = path.join(buildOutputDir, "_routes.json");
const routesManifestPath = path.join(
  buildOutputDir,
  "server-functions",
  "default",
  ".next",
  "routes-manifest.json",
);

const DEFAULT_ROUTE_EXCLUDES = [
  "/_next/static/*",
  "/_next/image*",
  "/_next/data/*",
  "/favicon.ico",
  "/robots.txt",
];

async function ensureFileExists(filePath, description) {
  try {
    await fs.access(filePath);
  } catch (error) {
    throw new Error(
      `Cannot prepare Cloudflare Pages deployment because the ${description} is missing at ${filePath}`,
    );
  }
}

async function ensureBuildDirectory() {
  await fs.mkdir(buildOutputDir, { recursive: true });
}

async function readJson(filePath) {
  try {
    const contents = await fs.readFile(filePath, "utf8");
    return JSON.parse(contents);
  } catch (error) {
    if (error.code === "ENOENT") {
      return undefined;
    }

    throw new Error(`Failed to read JSON from ${filePath}: ${error.message}`);
  }
}

function inferStaticRouteExcludes(routesManifest) {
  if (!routesManifest) {
    return [];
  }

  const staticRoutes = routesManifest.staticRoutes ?? [];
  const excludes = new Set();

  for (const route of staticRoutes) {
    if (typeof route.page !== "string") continue;

    if (route.page.startsWith("/_next")) {
      excludes.add(`${route.page}*`);
    }
  }

  return Array.from(excludes);
}

async function writeWorkerShim() {
  const shim = [
    "// Cloudflare Pages requires an entry file named \"_worker.js\".",
    "// See https://developers.cloudflare.com/pages/functions/#deploy-from-a-repository",
    "export { default } from \"./worker.js\";",
    "export * from \"./worker.js\";",
    "",
  ].join("\n");

  await fs.writeFile(pagesWorkerEntry, shim, "utf8");
}

async function writeRoutesManifest() {
  const routesManifest = await readJson(routesManifestPath);

  const exclude = new Set(DEFAULT_ROUTE_EXCLUDES);
  inferStaticRouteExcludes(routesManifest).forEach((route) => exclude.add(route));

  const routes = {
    version: 1,
    include: ["/*"],
    exclude: Array.from(exclude).sort(),
  };

  const contents = `${JSON.stringify(routes, null, 2)}\n`;
  await fs.writeFile(routesFile, contents, "utf8");
}

async function main() {
  await ensureFileExists(workerEntry, "OpenNext worker bundle");
  await ensureBuildDirectory();
  await writeWorkerShim();
  await writeRoutesManifest();
  console.log("Prepared Cloudflare Pages worker entry and routes manifest.");
}

await main();
