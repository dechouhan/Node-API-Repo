const express = require("express");
const routerUsers = new express.Router();
const Users = require("../models/users");

routerUsers.post("/users", async (req, res) => {
  try {
    const addinguser = new Users(req.body);
    const inserData = await addinguser.save();
    res.status(201).send(inserData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerUsers.get("/users", async (req, res) => {
  try {
    const allUsersData = await Users.find({});
    res.send(allUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerUsers.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedUsersData = await Users.findById(_id);
    res.send(selectedUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerUsers.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedUsersData = await Users.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(selectedUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerUsers.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedUsersData = await Users.findByIdAndDelete(_id);
    res.send(selectedUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = routerUsers;
