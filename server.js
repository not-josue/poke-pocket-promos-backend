const express = require("express");
const cors = require("cors");
const joi = require("joi");
const app = express();

const PORT = 8000;

app.use(express.static("public"));
app.use(express.json());
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

// Comments
let comments = [];

const schema = joi.object({
  cardid: joi.number().required(),
  name: joi.string().min(2).max(20).required(),
  text: joi.string().min(5).max(200).required(),
});

app.post("/comments", (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const comment = {
    id: comments.length + 1,
    cardid: Number(req.body.cardid),
    name: req.body.name,
    text: req.body.text,
    timestamp: new Date(),
  };

  comments.push(comment);
  res.status(201).send(comment);
});

app.get("/comments", (req, res) => {
  res.send(comments);
});

app.get("/comments/:id", (req, res) => {
  const { cardid } = req.query;

  if (!cardid) return res.status(400).send("No comments for this card...");

  const filter = comments.filter((el) => el.cardid === Number(cardid));

  res.send(filter);
});

// Editing Comments
app.put("/comments", (req, res) => {
  const { id, name, text } = req.body;
  const index = comments.findIndex((el) => el.id === Number(id));

  if (index === -1) return res.status(404).send("Comment not found...");

  comments[index].name = name;
  comments[index].text = text;
  comments[index].timestamp = new Date();

  res.send(comments[index]);
});

// Deleting Comments
app.delete("/comments/:id", (req, res) => {
  const commentId = Number(req.params.id);
  const index = comments.findIndex((el) => el.id === commentId);

  if (index === -1) return res.status(404).send("Comment not found...");

  const deletedComment = comments[index];
  comments.splice(index, 1);

  res.send(deletedComment);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected to PORT ${PORT}`);
});
