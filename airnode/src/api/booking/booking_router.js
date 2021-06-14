const express = require("express");

const bookingController = require("./booking_controller");

const bookingRouter = express.Router();

bookingRouter.post("/validate", [bookingController.validate]);
bookingRouter.get("/getBooking", [bookingController.getBooking]);
bookingRouter.get("/user/bookings",[bookingController.getUserBookings]);
bookingRouter.get("/users/getMostFrequentTravellers", [bookingController.getMostFrequentTravellers]);
bookingRouter.post("/confirmBooking",[bookingController.ConfirmBooking]);

module.exports = {
	bookingRouter,
};
