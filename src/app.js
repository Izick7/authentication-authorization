const express = require("express");

const authController = require("./controllers/authController");

const app = express();

app.use(express.json());

module.exports = app;