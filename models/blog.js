var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
    title: String,
    source: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Blog", blogSchema);