// In the future, this usernames array will be replaced with a database
var mongoose = require("mongoose");
var Users = mongoose.model('users');

var path = require('path');
var bcrypt = require('bcrypt');


// Get the viewable html page
const getPage = (req, res) => {
	//Send Web Page
	res.sendFile(path.join(__dirname + '/../views/login.html'));
};

// Get the viewable html page
const getFailedPage = (req, res) => {
	//Send Web Page
	res.status(400).send("Login Failed");
};

// User verification for login
const login = async (req, res) => {
	try{
		if(await isValidUser(req.body.username, req.body.password)){
			//In the finished website we would redirect to index page
			res.redirect("http://localhost:3000/index");
		}else{
			res.redirect('http://localhost:3000/login/failed');
		}
	}catch{
		res.redirect('http://localhost:3000/login/failed');
	}
};

// User verification
const isValidUser = async (username, password) => {
	const user = await Users.find({username: username}).exec();
	if(user == null){
		//There is no user with those details
		return false;
	}else{
		console.log(user[0].password)
	}
	try{
		if (await bcrypt.compare(password, user[0].password)) {
			return true;
		}else{
			console.log("error")
			return false;
		}
	}catch{
		console.log("catch error")
		return false;
	}

};

// User Creation Handling
const createUser = async (req, res) => {
	console.log("recieved username create request");
	const user = await Users.find({username: req.body.username}).exec();
	console.log(user)
	if(user[0] != null){
		return res.status(400).send("username taken");
	}
	try{
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		// TODO: Create user in database instead
		// TODO: There would be additional handling in the database to avoid duplicates
		// TODO: Use unique identifier in database to create user with same unique id in achievments database

		var item = {

			username:req.body.username,
			password:hashedPassword
		};

		var data = new Users(item);
		data.save();
		//users.push({
		//	id: users.length,
		//	username: req.body.username,
		//	password: hashedPassword
		//});

		// Send a created status code
		res.status(201).send("Successfully created user");
	}
	catch{
		res.status(500).send();
	}
};

// Remember to export the callbacks
module.exports = {
	getPage,
	isValidUser,
	createUser,
	login,
	getFailedPage
};
