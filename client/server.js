const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

async function main() {
  await app.prepare();

  const server = express();

  server.get("/p/:id", (req, res) => {
    const actualPage = "/post"
    const queryParams = {id: req.params.id};
    app.render(req, res, actualPage, queryParams)
  });

  server.get("*", (req, res) => {
    return handle(req, res)
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Next.js server listening on port ${PORT}.`)
  })
}

main();