const { createApp } = require("./app");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const server = createApp();

server.listen(port, () => {
  console.log(`Sample client project listening on http://localhost:${port}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}; shutting down.`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
