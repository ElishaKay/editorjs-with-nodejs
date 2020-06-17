const express = require("express");
// const app = express.app();
const app = express();
const { Blog, Comment } = require("../models/blogs");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Find all blogs present in database
app.get("/", (req, res) => {
	//Get all blogs and order them 'asc' by id
	Blog.findAll({
		order: [["id", "ASC"]],
		attributes: ["id", "title", "blog", "thumbnail"],
		raw: true,
	})
		.then((data) => res.status(200).send(data))
		.catch((err) => res.status(404).send(err));
});

//Find a specific blog
app.get("/find/:id*", async (req, res) => {
	//Find a specific blog by its id
	const blog = await Blog.findByPk(req.params.id);
	if (blog !== null) {
		//Blog found
		res.status(200).send(blog);
	} else {
		//Blog not found
		res.status(404).send("Blog not found");
	}
});

//Update blog
app.patch("/update", (req, res) => {
	//Destructuring data
	let { title, blog, thumbnail } = req.body;
	if (title === "" || blog === "" || thumbnail === "") {
		return res.status(400).send("Field can't be empty");
	}
	//Updating blog
	Blog.update({ title, blog, thumbnail }, { where: { id: req.query.id } })
		//Blog updated successfully
		.then((data) => res.status(200).send(data))
		//Something went wrong while updating blog
		.catch((err) => res.status(400).send(err));
});

//Delete blog
app.get("/delete", async (req, res) => {
	//Deleting all comments associated with a blog that need to be deleted
	await Comment.destroy({ where: { blogid: req.query.id } });
	//Delete blog and save numbers of row deleted
	let n = await Blog.destroy({ where: { id: req.query.id } });
	if (n > 0) {
		//Blog is deleted successfully
		res.status(200).send("Blog deleted");
	} else {
		//Something went wrong while deleting blog
		res.status(400).send(`Fail to delete`);
	}
});

//Creating new blog
app.post("/add", (req, res) => {
	//Destructuring data
	let { title, blog, thumbnail } = req.body;
	if (title === "" || blog === "" || thumbnail === "") {
		return res.status(400).send("Field can't be empty");
	}
	//Creating blog
	Blog.create({
		title,
		blog,
		thumbnail,
	})
		//Blog created successfully
		.then((data) => res.status(201).send(data))
		//Fail to create blog
		.catch((err) => res.status(400).send(err));
});
module.exports = app;
