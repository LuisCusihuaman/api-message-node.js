const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			require: true,
		},
		creator: {
			type: Object,
			require: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);