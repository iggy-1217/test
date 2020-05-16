var userAchievements = require('../models/userAchievements');

function UserAchievements(userID) {		// constructor for new user's achievement listing
	this.userID = userID;
	this.ach1 = '0';
	this.ach2 = '0';
	this.ach3 = '0';
}

// function to handle a request to get a user and their achievements
const getAllAchievements = (req,res) => {
	res.send(userAchievements);
};

// function to handle a request to get a user and their achievements
const getUserAllAchievements = (req,res) => {
	const user = userAchievements.find(userAchievements => userAchievements.userID === req.params.userID);

	res.send(user);
};

// function to handle a request to get a specific achievement for a user
const getUserAchievementByID = (req,res) => {
	const user = userAchievements.find(userAchievements => userAchievements.userID === req.params.userID);
	if(user != null){
		const achievement = req.params.achID;
		const userAchievement = user[achievement];
		res.send(userAchievement);
	}else{
		res.status(400).send("User not found");
	}
}

// function to unlock an achievement for a specific user
const unlockAchievement = (req,res) => {
	const user = userAchievements.find(userAchievements => userAchievements.userID === req.params.userID);
	if(user != null){
		const achievement = req.params.achID;
		user[achievement] = '1';
		console.log(user);
		res.status(400).send("Successfully Updated User Achievement");
	}else{
		res.status(400).send("User not found");
	}
}


// Remember to export the callbacks
module.exports = {
    unlockAchievement,
	getUserAllAchievements,
	getUserAchievementByID,
	getAllAchievements
};
