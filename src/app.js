const express = require('express');
require('../src/db/conn');
const users = require('../src/models/users');
const app = express();
const port = process.env.PORT || 7000;
const router = require('./routers/usersRouter')
var cors = require('cors');
const members = require('./models/members');

app.use(cors());
app.use(express.json())
app.use(router)

app.listen(port,()=>{
    console.log(`connection is live at port ${port}`)
})