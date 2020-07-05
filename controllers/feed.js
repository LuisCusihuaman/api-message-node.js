const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
	Post.find()
		.then((posts) => {
			res.status(200).json({
				message: "Fetched posts successfully",
				posts,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error(
			"Validation failed, entered data is incorrect."
		);
		error.statusCode = 422;
		throw error;
	}
	if (!req.file) {
		const error = new Error("No image provided.");
		error.statusCode = 422;
		throw error;
	}
	const imageUrl = req.file.path;
	const title = req.body.title;
	const content = req.body.content;
	// Create post in db
	const post = new Post({
		title,
		content,
		imageUrl,
		creator: { name: "Luis" },
	});
	post.save()
		.then((result) => {
			console.log(result);
			res.status(201).json({
				message: "Post created successfully!",
				post: result,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
		.then((post) => {
			if (!post) {
				const err = new Error("Could not find post.");
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ message: "Post fetched.", post });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};