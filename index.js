const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on("request", async (req, res) => {
  const requestUrl = new URL(`http://localhost:8000${req.url}`);
  const path = requestUrl.pathname;
  const body = await generateResponseData(path);
  const statusCode =
    path !== "/" && path !== "/about" && path !== "/contact-me" ? 404 : 200;
  res.writeHead(statusCode, {
    "Content-Type": "text/html",
    "Content-length": body.length,
  });
  res.end(body);
});

server.listen(8000);

async function generateResponseData(path) {
  let fileName;
  if (path == "/") {
    fileName = "./index.html";
  } else if (path == "/about" || path == "/contact-me") {
    fileName = `.${path}.html`;
  } else {
    fileName = "./404.html";
  }

  try {
    const data = fs.readFile(fileName, { encoding: "utf8" });
    return data;
  } catch (err) {
    console.error(err);
  }
}
