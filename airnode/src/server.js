require("dotenv").config();

const express = require("express");

const { restRouter } = require("./api");

const app = express();
app.use(express.json());


app.use("/api", [restRouter]);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
	console.log(`server listening at port ${PORT}`);
});
