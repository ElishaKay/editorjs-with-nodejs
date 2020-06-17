//Node Modules
const express = require("express");
// const router = express.Router();
const app = express();
const { Comment } = require("../models/blogs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Find all commnets just created for testing
app.get("/", (req, res) => {
	Comment.findAll({
		order: [["id", "ASC"]],
		attributes: ["id", "comment", "blogid"],
		raw: true,
	})
		.then((data) => res.status(200).send(data))
		.catch((err) => res.status(404).send(err));
});

//Find all comment of a specific blog
app.get("/find/:id*", (req, res) => {
	// console.log(req.params.id);
	Comment.findAll({
		where: {
			blogid: req.params.id,
		},
		order: [["id", "ASC"]],
	})
		.then((data) => res.status(200).send(data))
		.catch((err) => res.status(404).send(err));
});

//Find a specific comment
app.get("/findbyid/:id*", async (req, res) => {
	//find a specific comment by its id
	const comment = await Comment.findByPk(req.params.id);
	if (comment !== null) {
		//Comment found
		res.status(200).send(comment);
	} else {
		//Comment not found
		res.status(404).send("Commnet not found");
	}
});

//Update comment
app.patch("/update", (req, res) => {
	let { comment } = req.body;
	if (comment === "") {
		return res.status(400).send("Field can't be empty");
	}
	//Updating comment
	const n = Comment.update({ comment }, { where: { id: req.query.id } })
		//Comment updated successfully
		.then((data) => res.status(200).send(data))
		//Something went wrong while updating comment
		.catch((err) => res.status(400).send(err));
});

//Delete comment
app.get("/delete", async (req, res) => {
	const n = await Comment.destroy({ where: { id: req.query.id } });
	if (n > 0) {
		res.status(200).send(`Number of deleted rows: ${n}`);
	} else {
		res.status(400).send(`Fail to delete`);
	}
});

app.get("/deleteall", async (req, res) => {
	const n = await Comment.destroy({ where: { blogid: req.query.id } });
	// if (n > 0) {
	// 	res.send(`Number of deleted rows: ${n}`);
	// } else {
	// 	res.send(`Fail to delete`);
	// }
});
//Create new comment
app.post("/add", (req, res) => {
	let { comment, blogid } = req.body;
	if (comment === "" || blogid === "") {
		return res.status(400).send("Field can't be empty");
	}
	//Creating comment
	Comment.create({
		comment,
		blogid,
	})
		//Comment added successfully
		.then((data) => res.status(201).send(data))
		//Fail to add comment
		.catch((err) => res.status(400).send(err));
});

module.exports = app;
