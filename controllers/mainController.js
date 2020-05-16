var path = require('path');

const getIndexPage = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/index.html'));
};

const getAboutPage = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/about.html'));
};

const getProfilePage = (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/profile.html'));
};

module.exports = {
	getIndexPage,
	getAboutPage,
	getProfilePage
};
