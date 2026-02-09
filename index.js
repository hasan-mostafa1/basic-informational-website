const express = require("express");
const path = require("node:path");

const app = express();

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", async (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact-me", async (req, res) => {
  res.sendFile(path.join(__dirname, "contact-me.html"));
});

app.use("/", async (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My Express app - listening on port ${PORT}!`);
});
