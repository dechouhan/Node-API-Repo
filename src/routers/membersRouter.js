const express = require("express");
const Members = require("../models/members");
const routerMembers = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

routerMembers.post("/signup", async (req, res) => {
  const userExist = await Members.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(403).json({ message: "Email is Taken" });
  }
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await new Members({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  await user.save();
  res.status(200).json({ user, message: "success" });
});

routerMembers.post("/login", async (req, res) => {
  const fetchUser = await Members.findOne({ email: req.body.email });
  if (!fetchUser) {
    return res.status(401).json({
      message: "Auth failed no such user",
    });
  }
  const checkPassword = await bcrypt.compare(
    req.body.password,
    fetchUser.password
  );
  if (!checkPassword) {
    return res.status(401).json({
      message: "Auth failed inccorect password",
    });
  }
  const token = jwt.sign(
    { email: fetchUser.email, userId: fetchUser._id },
    "secret_this_should_be_longer",
    { expiresIn: "1h" }
  );
  res.status(200).json({
    token: token,
    expiresIn: 3600,
    _id: fetchUser._id,
    email: fetchUser.email,
    name: fetchUser.name,
    message: "Login Successfully",
  });
});

routerMembers.get("/members", async (req, res) => {
  try {
    const allMembersData = await Members.find({});
    res.send(allMembersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerMembers.delete("/members/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedMemberData = await Members.findByIdAndDelete(_id);
    res.send(selectedMemberData);
  } catch (e) {
    res.status(404).send(e);
  }
});

routerMembers.put("/members/:id", async (req, res) => {
  try {
    let selectedMemberData;

    const _id = req.params.id;
    const fetchMember = await Members.findById(_id);
    const checkPassword = await bcrypt.compare(
      req.body.password,
      fetchMember.password
    );
    if (checkPassword || req.body.password == "") {
      selectedMemberData = await Members.findByIdAndUpdate(
        _id,
        { name: req.body.name, email: req.body.email },
        {
          new: true,
        }
      );
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      selectedMemberData = await Members.findByIdAndUpdate(
        _id,
        { name: req.body.name, email: req.body.email, password: hash },
        {
          new: true,
        }
      );
    }
    res.send(selectedMemberData);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = routerMembers;
