const express = require("express");
const routerComments = new express.Router();
const Comments = require("../models/comments");

routerComments.post("/comments", async (req, res) => {
  try {
    const addingComment = await new Comments(req.body);
    const insertComment = await addingComment.save();
    res.status(201).send(insertComment);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerComments.get("/comments", async (req, res) => {
  try {
    const allPostsData = await Comments.find({});
    res.send(allPostsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerComments.get("/comments/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const selectedCommentsData = await Comments.find({ postId: postId });
    res.send(selectedCommentsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerComments.patch("/comments/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedPostsData = await Comments.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(selectedPostsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = routerComments;
