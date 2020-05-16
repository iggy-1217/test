const express = require('express');

// add out router
const achvRouter = express.Router();

// require the achievement controller
const achvController = require('../controllers/achvController.js');

// Get all achievement data, (Only used for testing in deliverable 2)
achvRouter.get('/', (req,res) => achvController.getAllAchievements(req,res));

// handle GET request to unlock an achievement
achvRouter.get("/unlock/:userID/:achID", (req, res) => achvController.unlockAchievement(req,res));

// handle GET request for a user's achievements
achvRouter.get('/:userID', (req,res) => achvController.getUserAllAchievements(req,res));

// handle GET request for a specific achievement for a user
achvRouter.get('/:userID/:achID', (req,res) => achvController.getUserAchievementByID(req,res));

// export the router
module.exports = achvRouter;
