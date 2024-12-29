const express = require("express");
require("dotenv").config();
const cors = require("cors");

const Connection = require("./src/config/db.js");
const userRouter = require('./src/routes/user.route.js')
const groceryRouter = require('./src/routes/grocery.route.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

Connection();
app.use('/api/v1/user',userRouter);
app.use('/api/v1/grocery',groceryRouter)
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

module.exports = app;
