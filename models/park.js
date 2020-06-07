var mongoose = require("mongoose");

var parkSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    website: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    photos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photo"
        }
    ]
});

module.exports = mongoose.model("Park", parkSchema);