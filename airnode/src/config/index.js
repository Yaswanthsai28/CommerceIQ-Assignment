const config = {
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		dialect: process.env.DB_DIALECT,
	},
	secrets: {
		JWT_SECRET: process.env.JWT_SECRET,
		POSTGRES_SECRET: process.env.POSTGRES_SECRET,
	},
};

module.exports = {
	config,
};
