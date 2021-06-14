const express = require("express");

const { bookingRouter } = require("./booking");

const restRouter = express.Router();

restRouter.use("/booking", bookingRouter);

module.exports = {
	restRouter,
};
