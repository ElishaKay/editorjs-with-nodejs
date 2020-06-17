const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
const app = express();
app.use(bodyParser.json());
const path = require('path');

// CORS header
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
	next();
});

//Check DB connection just for testing
db.authenticate()
	.then(() => console.log("Database Connected"))
	.catch(err => console.log("Error" + err));

app.use(express.static(path.join(__dirname, `../Frontend`)));

//Just created for testing
app.get("/", (req, res) => {
	// res.send("Working");
	// res.sendFile('absolutePathToYour/htmlPage.html');
	res.sendFile(path.join(__dirname, `../Frontend/index.html`));
});

// Routes for blog API
app.use("/blogs", require("./routes/blogs-route"));

// Routes for comment API
app.use("/comments", require("./routes/comment-route"));

//Running app on port 3000
app.listen(3000, () => {
	console.log("App is UP & Running at port 3000");
});
