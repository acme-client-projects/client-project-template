# Client Project Template

A minimal Node.js project used as the starter repository for client-project provisioning tests.

## Requirements

- Node.js 20 or later
- npm (included with Node.js)

The project uses only built-in Node.js modules, so no third-party package installation is required.

## Quick start

```bash
npm start
```

The service starts on port `3000` by default. Override it with the `PORT` environment variable.

## Endpoints

- `GET /health` — health check used by deployment smoke tests
- `GET /api/project` — sample project metadata response
- Any other route returns a JSON 404 response

Examples:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/project
```

## Tests

```bash
npm test
```

Tests use Node.js's built-in test runner and an automatically selected local port.

## Template usage

Use GitHub's **Use this template** action or the provisioning workflow to create a fresh client project. Replace the sample metadata in `src/app.js` during project setup.
