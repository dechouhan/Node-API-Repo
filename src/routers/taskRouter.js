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
    if (req.query.startDate && req.query.endDate) {
      const allMembersData = await Tasks.find({
        $and: [
          { date: { $gte: req.query.startDate } },
          { date: { $lte: req.query.endDate } },
        ],
      });
      res.send(allMembersData);
    } else {
      const allMembersData = await Tasks.find({});
      res.send(allMembersData);
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = routerTasks;
