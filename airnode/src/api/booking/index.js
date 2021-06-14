const { bookingModel, sequelize } = require("./booking_model");

const { bookingRouter } = require("./booking_router");

module.exports = {
	bookingModel,
	bookingRouter,
};
