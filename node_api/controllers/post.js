const Post = require("../model/post");
const formidable = require("formidable");
const fs = require("fs") // Pure nodejs module
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
	Post.findById(id)
	.populate("postedBy", "_id name")
	.exec((err, post) => {
		if(err || !post) {
			return res.status(400).json({
				error: err
			});
		}
		req.post = post;
		next();
	});
};

exports.getPost = (req, res) => {
	// res.json({
	// 	 posts: [{ title: "First post" }, { title: "Second post" }]
	// });
	const posts = Post.find()
	.populate("postedBy", "_id name")
	.select("_id title body").then(posts => {
			res.json({ posts });
	}).catch(err => console.log(err));
};

exports.createPost = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if(err) {
			return res.status(400).json({
				error: "Image cannot be uploaded!"
			});
		}

	req.profile.hash_password = undefined;
	req.profile.salt = undefined;

	let post = new Post(fields);
	post.postedBy = req.profile;
	if(files.photo) {
		post.photo.data = fs.readFileSync(files.photo.path);
		post.photo.contentType = files.photo.type;
	}
	post.save((err, data) => {
		if(err) {
			return res.status(400).json({
				error: err
			});
		}
		res.json(data);
	});

	});
	/*const post = new Post(req.body);
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
	});*/
};

exports.postsByUser = (req, res) => {
		Post.find({postedBy: req.profile._id})
		.populate("postedBy", "_id name")
		.sort("_created")
		.exec((err, posts) => {
			if(err) {
				return res.status(400).json({
					error: err
				});
			}
			res.json(posts);
		});
	};

exports.isPoster = (req, res, next) => {
	let poster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

	console.log("req.post:", req.post);
	console.log("req.auth:", req.auth);
	console.log("req.post.postedBy._id:", req.post.postedBy._id);
	console.log("req.auth._id:", req.auth._id);

	if(!poster) {
		return res.status(403).json({
			error: "User is not authorised!"
		});
	}
	next();
 };

 exports.updatePost = (req, res, next) => {
 	let post = req.post;
 	post = _.extend(post, req.body);
 	post.updated = Date.now();
 	post.save(err => {
 		if(err) {
 		return res.status(400).json({
 			error: "You are not authorized!"	
 		});
 	}
 		res.json({ post });
 	});
 };

exports.deletePost = (req, res) => {
	let post = req.post;
	post.remove((err, post) => {
		if(err) {
			return res.status(400).json({
				error: err
			});
		}
		res.json({
			message: "Post deleted!"
		});
	});
};