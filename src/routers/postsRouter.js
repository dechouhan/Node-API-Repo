const express = require("express");
const routerPosts = new express.Router();
const Posts = require("../models/posts");

routerPosts.post("/posts", async (req, res) => {
  try {
    const addingPost = await new Posts(req.body);
    const insertPost = await addingPost.save();
    res.status(201).send(insertPost);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerPosts.get("/posts", async (req, res) => {
  try {
    const allPostsData = await Posts.find({});
    res.send(allPostsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerPosts.get("/posts/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const selectedPostsData = await Posts.find({ userId: userId });
    res.send(selectedPostsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerPosts.patch("/posts/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedPostsData = await Posts.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(selectedPostsData);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = routerPosts;
