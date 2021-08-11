const express = require("express");
require("../src/db/conn");
const app = express();
const port = process.env.PORT || 7000;
const routerUsers = require("./routers/usersRouter");
var cors = require("cors");
const routerMembers = require("./routers/membersRouter");

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerMembers);

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
