var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var groupSchema = new Schema(
    {   
        owner: String,
        group_name: String,
        group_subject: String,
        group_assignment: String,
        group_members: []
    }, {collections: "groups"}
);

module.exports = mongoose.model("groups", groupSchema);


