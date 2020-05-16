var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {   username: {type: String, required: true},
        password: String
    }, {collection: "Users"}
);


module.exports = mongoose.model("users", userSchema);
