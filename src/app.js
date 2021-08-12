const express = require("express");
require("../src/db/conn");
const app = express();
const port = process.env.PORT || 7000;
const routerUsers = require("./routers/usersRouter");
var cors = require("cors");
const routerMembers = require("./routers/membersRouter");
const routerPosts = require("./routers/postsRouter");
const routerComments = require("./routers/commentsRouter");

app.use(cors());
app.use(express.json());
app.use(routerUsers);
app.use(routerMembers);
app.use(routerPosts);
app.use(routerComments);

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
