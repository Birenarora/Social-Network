const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: "Title can't be empty!",
		minlength: 4,
		maxlength: 250
	},
	body: {
		type: String,
		required: "Body can't be empty!",
		minlength: 4,
		maxlength: 2500
	}
});

module.exports = mongoose.model("Post", postSchema)