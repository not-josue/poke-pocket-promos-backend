const express = require("express");
const cors = require("cors");
const joi = require("joi");
const app = express();
const mongoose = require("mongoose");

const PORT = 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://admin:g73qPnmIfXBabAuR@cluster0.ieszscz.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB Atlas...");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Schema for Comments
// Comment id is generated automatically by MongoDB
const commentSchema = new mongoose.Schema({
  cardid: Number,
  name: String,
  text: String,
  timestamp: Date,
});

const Comment = mongoose.model("Comment", commentSchema);

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
// let comments = [];

const schema = joi.object({
  cardid: joi.number().required(),
  name: joi.string().min(2).max(20).required(),
  text: joi.string().min(5).max(200).required(),
});

app.post("/comments", async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const comment = new Comment({
    // id: comments.length + 1,
    cardid: Number(req.body.cardid),
    name: req.body.name,
    text: req.body.text,
    timestamp: new Date(),
  });

  // comments.push(comment);
  const newComment = await comment.save();
  res.status(201).send(newComment);
});

app.get("/comments", async (req, res) => {
  // const comments = await Comment.find();
  // console.log(comments);
  // res.send(comments);

  const { cardid } = req.query;

  try {
    // replaces old filtering GET request
    // works for url?cardid=n ; where n is the cardid
    if (cardid !== undefined) {
      const filtered = await Comment.find({ cardid: Number(cardid) });
      return res.send(filtered);
    }
    // All comments if no query search
    const allComments = await Comment.find();
    res.send(allComments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).send("Server error while fetching comments");
  }
});

// Editing Comments
app.put("/comments/:id", async (req, res) => {
  // const { id, name, text } = req.body;
  // const index = comments.findIndex((el) => el.id === Number(id));

  // if (index === -1) return res.status(404).send("Comment not found...");

  // comments[index].name = name;
  // comments[index].text = text;
  // comments[index].timestamp = new Date();

  const updateSchema = joi.object({
    name: joi.string().min(2).max(20),
    text: joi.string().min(5).max(200),
  });

  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const fieldsToUpdate = {
    name: req.body.name,
    text: req.body.text,
    timestamp: new Date(),
  };

  const result = await Comment.findByIdAndUpdate(
    req.params.id,
    fieldsToUpdate,
    { new: true } // Returns the updated document instead of the original
  );

  res.send(result);
});

// Deleting Comments
app.delete("/comments/:id", async (req, res) => {
  // const commentId = Number(req.params.id);
  // const index = comments.findIndex((el) => el.id === commentId);

  // if (index === -1) return res.status(404).send("Comment not found...");

  // const deletedComment = comments[index];
  // comments.splice(index, 1);

  const comment = await Comment.findByIdAndDelete(req.params.id);

  res.send(comment);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server connected to PORT ${PORT}`);
});
