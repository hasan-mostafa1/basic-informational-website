const express = require("express");
const fs = require("node:fs/promises");

const app = express();

app.get("/", async (req, res) => {
  const body = await generateResponseData("index");
  res.send(body);
});

app.get("/about", async (req, res) => {
  const body = await generateResponseData("about");
  res.send(body);
});

app.get("/contact-me", async (req, res) => {
  const body = await generateResponseData("contact-me");
  res.send(body);
});

app.use("/", async (req, res) => {
  const body = await generateResponseData("404");
  res.status(404).send(body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My Express app - listening on port ${PORT}!`);
});

async function generateResponseData(fileName) {
  try {
    const data = await fs.readFile(`./${fileName}.html`, { encoding: "utf8" });
    return data;
  } catch (err) {
    console.error(err);
  }
}
