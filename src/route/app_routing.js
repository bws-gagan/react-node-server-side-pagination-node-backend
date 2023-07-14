let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let UserService = require("../services/user_service");
let app = express();
const router = express.Router();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const config = require("../config/config");

/**
 * @author Gagan KC
 */

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", router);

mongoose.connect(config.url, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

/**
 * @author Gagan KC
 * get login request
 */
app.post("/paginator/user/login", async function (req, res) {
  let data = {
    email: req.body.email,
    password: req.body.password,
  };

  let user = new UserService();
  let getLoginResponse = await user.getLogin(data);
  res.send(getLoginResponse);
});

/**
 * @author Gagan KC
 * Add user data request
 */
app.post("/paginator/user/create", async function (req, res) {
  let requestData = {
    usertype: req.body.usertype,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
    location: req.body.location,
    status: "active",
  };

  let user = new UserService();
  let addUserResponse = await user.addUser(requestData);
  res.send(addUserResponse);
});

/**
 * @author Gagan KC
 * Update user data request
 */
app.post("/paginator/user/update/:id", async function (req, res) {
  let requestData = {
    id: req.params.id,
    usertype: req.body.usertype,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
    location: req.body.location,
    status: "active",
  };

  let user = new UserService();
  let updateUserResponse = await user.updateUser(requestData);
  res.send(updateUserResponse);
});

/**
 * @author Gagan KC
 * Update user data request
 */
app.post("/paginator/user/delete/:id", async function (req, res) {
  let requestData = {
    id: req.params.id,
    status: "inactive",
  };

  let user = new UserService();
  let deleteUserResponse = await user.deleteUser(requestData);
  res.send(deleteUserResponse);
});

/**
 * @author Gagan KC
 * get all user request
 */
app.post("/paginator/user/alluser", async function (req, res) {
  let requestData = {
    page: req.body.page,
    size: req.body.size,
    search: req.body.search,
    email: req.body.filterEmail,
    name: req.body.filterName,
    location: req.body.filterLocation,
  };
  let user = new UserService();
  let getAllResponse = await user.getAllUser(requestData);
  res.send(getAllResponse);
});

module.exports = app;
const port = 9000;
app.listen(port, () =>
  console.log(`Paginator-Server app listening on port ${port}!`)
);

// module.exports = app;
// const host = "192.168.31.187";
// const port = 9000;
// app.listen(port, host, () =>
//   console.log(`Example app listening on port ${port}! host ${host}!`)
// );
