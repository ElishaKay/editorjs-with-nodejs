// Database connection configration for Sequelize ORM
const Sequelize = require("sequelize");

// This configration is for Postgresql while using other DB change 'dialect'
// DB name: "blogdb", Username :"satish", Password:"1234"
module.exports = new Sequelize("b6vr7kkwfb0695pi", "t8rwu2o0pn04eb4c", "kf45z6jb8pnycr96", {
	host: "ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	dialect: "mysql",

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});
