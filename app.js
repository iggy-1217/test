const express = require('express')
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'pug');

require("./models")

const loginRouter = require('./routes/loginRouter');
const achvRouter = require('./routes/achvRouter');
const groupRouter = require('./routes/groupRouter');

const mainController = require('./controllers/mainController');

// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
// support parsing of urlencoded bodies (e.g. for forms)
app.use(bodyParser.urlencoded({extended: true }));

// GET home page
app.get('/', (req, res) => {
	//res.redirect('/index');
	res.render('index',{
		title:'Study Group'
	})
});

//Main page
app.get('/index', (req, res) => mainController.getIndexPage(req, res));
//About page
app.get('/about', (req, res) => mainController.getAboutPage(req, res));
//Profile page
app.get('/profile', (req, res) => mainController.getProfilePage(req, res));

// handle login/registration
app.use('/login', loginRouter);

// Handle achievements requests
// the author routes are added onto the end of '/achievements'
app.use('/achievements', achvRouter);

app.use('/find', express.static('./groupViews/'));

//the group routes are added onto the end of '/getgroup'
app.use('/groups',groupRouter);

// Start Server
app.listen(process.env.PORT || 3000, () => {
	console.log("The library app is running!");
});