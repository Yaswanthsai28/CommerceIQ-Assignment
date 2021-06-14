const Sequelize = require("sequelize");
const { sequelize, POSTGRES_SECRET } = require("../../db");
const bookingDetails = sequelize.define(
	"bookingDetails",
	{
		bookingid: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: Sequelize.STRING,
		},
		lastName: {
			type: Sequelize.STRING,
		},
		PNR: {
			type: Sequelize.STRING,
		},
		fareClass: {
			type: Sequelize.STRING,
		},
		travelDate: {
			type: Sequelize.DATEONLY,
		},
		ticketingDate: {
			type: Sequelize.DATEONLY,
		},
		email: {
			type: Sequelize.STRING,
		},
		mobilePhone: {
			type: Sequelize.STRING,
		},
		bookedCabin: {
			type: Sequelize.STRING,
		},
		boarding: {
			type: Sequelize.STRING,
		},
		destination: {
			type: Sequelize.STRING,
		},
		userID: {
			type: Sequelize.STRING,
		},
		age: {
			type: Sequelize.STRING,
		},
		valid: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		conform: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
		bookedTime:{
			type: Sequelize.DATE,
		}
	},
	{
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: "bookings",
	}
);

const airportDetails = sequelize.define(
	"airportDetails",
	{
		boarding: {
			type: Sequelize.STRING,
		},
		destination: {
			type: Sequelize.STRING,
		},
	},
	{
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: "airports",
	}
);


module.exports.bookingModel = bookingDetails;
module.exports.airportModel = airportDetails;
module.exports.sequelize = sequelize;
module.exports.POSTGRES_SECRET = POSTGRES_SECRET;
