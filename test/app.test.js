const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const { createApp } = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = createApp();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test("GET /health returns a healthy response", async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.service, "sample-client-project");
  assert.match(body.timestamp, /^\d{4}-\d{2}-\d{2}T/);
});

test("GET /api/project returns sample project metadata", async () => {
  const response = await fetch(`${baseUrl}/api/project`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    name: "Sample Client Project",
    slug: "sample-client-project",
    type: "Web",
    status: "ready",
  });
});

test("unknown routes return structured JSON 404s", async () => {
  const response = await fetch(`${baseUrl}/does-not-exist`);
  const body = await response.json();

  assert.equal(response.status, 404);
  assert.deepEqual(body, {
    error: "not_found",
    path: "/does-not-exist",
  });
});
