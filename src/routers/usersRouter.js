const express = require("express");
const members = require("../models/members");
const router = new express.Router();
const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const userExist = await members.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(403).json({ message: "Email is Taken" });
  }
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await new members({
    name: req.body.name,
    email: req.body.email,
    password: hash, 
  });
  await user.save();
  res.status(200).json({ user ,message:"success"});
});


router.post("/login",async (req, res)=>{
  const fetchUser = await members.findOne({ email: req.body.email })
  if (!fetchUser) {
    return res.status(401).json({
      message: "Auth failed no such user",
    });
  }
  const checkPassword = await bcrypt.compare(req.body.password, fetchUser.password);
  if (!checkPassword) {
    return res.status(401).json({
      message: "Auth failed inccorect password",
    });
  }
  const token =jwt.sign(
    { email: fetchUser.email, userId: fetchUser._id },
    "secret_this_should_be_longer",
    { expiresIn: "1h" }
  );
  res.status(200).json({
    token: token,
    expiresIn: 3600,
    _id: fetchUser._id,
    email:fetchUser.email,
    name:fetchUser.name,
    message: "Login Successfully",
  });
})

router.get("/members", async (req, res) => {
  try {
    const allMembersData = await members.find({});
    res.send(allMembersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/members/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedMemberData = await members.findByIdAndDelete(_id);
    res.send(selectedMemberData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.put("/members/:id", async (req, res) => {
  try {
    let selectedMemberData

    const _id = req.params.id;
    const fetchMember = await members.findById(_id)
    const checkPassword = await bcrypt.compare(req.body.password, fetchMember.password);
    if (checkPassword || req.body.password=="") {
    selectedMemberData = await members.findByIdAndUpdate(_id,{name:req.body.name,email:req.body.email}, {
      new: true,
    });
  }
  else{
    const hash = await bcrypt.hash(req.body.password, 10);
    selectedMemberData = await members.findByIdAndUpdate(_id,{name:req.body.name,email:req.body.email,password:hash}, {
      new: true,
    });
  }
    res.send(selectedMemberData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.post("/users", async (req, res) => {
  try {
    const addinguser = new users(req.body);
    const inserData = await addinguser.save();
    res.status(201).send(inserData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsersData = await users.find({});
    res.send(allUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedUsersData = await users.findById(_id);
    res.send(selectedUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedUsersData = await users.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(selectedUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const selectedUsersData = await users.findByIdAndDelete(_id);
    res.send(selectedUsersData);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
