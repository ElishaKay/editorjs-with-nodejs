const Sequelize = require("sequelize");
const db = require("../config/database");

// Blog database defination
const Blog = db.define("blogs", {
	title: {
		type: Sequelize.STRING
	},
	blog: {
		type: Sequelize.JSON
	},
	thumbnail: {
		type: Sequelize.STRING
	}
});

// Comment database defination
const Comment = db.define("comments", {
	comment: {
		type: Sequelize.TEXT
	},
	blogid: {
		type: Sequelize.NUMBER
	}
});

module.exports = { Blog, Comment };
