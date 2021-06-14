const Sequelize = require("sequelize");
const { config } = require("./config");

const sequelize = new Sequelize(
	config.db.name,
	config.db.user,
	config.db.pass,
	{
		host: config.db.host,
		port: config.db.port,
		dialect: config.db.dialect,
		pool: {
			max: 9,
			min: 0,
			idle: 10000,
		},
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log(`Database connected with host as ${config.db.host}!`);
	})
	.catch((err) => {
		console.log(err);
	});

const { Op } = Sequelize;

const POSTGRES_SECRET = config.secrets.POSTGRES_SECRET;

// sequelize.sync().then(() => {
// 	console.log("Table created, Comment me at line number 32 in db.js");
// });

module.exports = {
	sequelize,
	Op,
	POSTGRES_SECRET,
};
