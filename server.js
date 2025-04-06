const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/pokemon", (req, res) => {
  res.sendFile(__dirname + "/public/api/pokemon.json");
});

app.get("/items", (req, res) => {
  res.sendFile(__dirname + "/public/api/items.json");
});

app.get("/supporters", (req, res) => {
  res.sendFile(__dirname + "/public/api/supporters.json");
});

app.get("/releases", (req, res) => {
  res.sendFile(__dirname + "/public/api/releases.json");
});

app.listen(3000, () => {
  console.log("I'm listening");
});
