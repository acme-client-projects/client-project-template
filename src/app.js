const http = require("node:http");

const project = {
  name: "Sample Client Project",
  slug: "sample-client-project",
  type: "Web",
  status: "ready",
};

function sendJson(response, statusCode, body) {
  const payload = JSON.stringify(body);
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
  });
  response.end(payload);
}

function createApp() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, "http://localhost");

    if (request.method === "GET" && url.pathname === "/health") {
      sendJson(response, 200, {
        status: "ok",
        service: project.slug,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/project") {
      sendJson(response, 200, project);
      return;
    }

    sendJson(response, 404, {
      error: "not_found",
      path: url.pathname,
    });
  });
}

module.exports = { createApp, project };
