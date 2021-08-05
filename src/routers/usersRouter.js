const express = require('express')
const router = new express.Router();
const users = require('../models/users')

router.post("/users",async (req,res)=>{
    try{
        const addinguser = new users(req.body)
        const inserData = await addinguser.save();
        res.status(201).send(inserData)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.get("/users",async (req,res)=>{
    try{
        const allUsersData =await users.find({})
        res.send(allUsersData)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.get("/users/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const selectedUsersData =await users.findById(_id)
        res.send(selectedUsersData)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.patch("/users/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const selectedUsersData =await users.findByIdAndUpdate(_id,req.body, {new:true})
        res.send(selectedUsersData)
    }
    catch(e){
        res.status(404).send(e)
    }
})


router.delete("/users/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const selectedUsersData =await users.findByIdAndDelete(_id)
        res.send(selectedUsersData)
    }
    catch(e){
        res.status(404).send(e)
    }
})

module.exports = router;