const express = require("express");
const Tasks = require("../models/taskModel");
const routerTasks = new express.Router();


routerTasks.post("/tasks", async (req, res) => {
  try {
    const addingTask = new Tasks(req.body);
    const insertData = await addingTask.save();
    res.status(201).send("Success");
  } catch (e) {
    res.status(404).send("failure");
  }
});

routerTasks.get("/tasks", async (req, res) => {
  try {
    const allTasksData = await Tasks.find({});
    res.send(allTasksData);
  } catch (e) {
    res.status(404).send(e);
  }
});
routerTasks.get("/tasks/:username", async (req, res) => {
  try {
    var regex =await new RegExp(req.params.username,'i');
    const allMembersData = await Tasks.find({username:regex});
    res.send(allMembersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

// routerTasks.patch("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const selectedUsersData = await Users.findByIdAndUpdate(_id, req.body, {
//       new: true,
//     });
//     res.send(selectedUsersData);
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });

// routerTasks.delete("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const selectedUsersData = await Users.findByIdAndDelete(_id);
//     res.send(selectedUsersData);
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });

module.exports = routerTasks;
