// Connect to MongoDB
var mongoose = require('mongoose');

const uti = "mongodb+srv://Yijing:123@cluster0-idhu9.mongodb.net/test?retryWrites=true&w=majority";
console.log(uti);



mongoose.connect(uti || "mongodb://localhost/info30005", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "test"
});

const db = mongoose.connection;
db.on("error", err => {
    console.error(err);
    process.exit(1);
});
db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" + db.port);
});

require("./users");
require("./group")