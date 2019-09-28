const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

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
	},
	post: {
		data: Buffer, // type can be changed to buffer
		contentType: String
	},
	postedBy: {
		type: ObjectId,
		ref: "User"
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Post", postSchema)