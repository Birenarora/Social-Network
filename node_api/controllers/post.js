const Post = require("../model/post")

exports.getPost = (req, res) => {
	// res.json({
	// 	 posts: [{ title: "First post" }, { title: "Second post" }]
	// });
	const posts = Post.find().select("_id title body").then(posts => {
			res.json({ posts });
	}).catch(err => console.log(err));
};

exports.createPost = (req, res) => {
	const post = new Post(req.body);
	// console.log("Creating Post: ", req.body);
	// post.save((err, data) => {
	// 	res.status(200).json({
	// 		post: data
	// 	});
	// });
	post.save().then(data => {
		res.status(200).json({
			post: data
		});
	});
};