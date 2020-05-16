const express = require('express')
const groupRouter = express.Router();
const groupController = require('../controllers/groupController.js');

groupRouter.get('/', (req, res) => groupController.getPage(req, res));

groupRouter.get('/get', (req, res) => groupController.getAllGroups(req, res));

groupRouter.post('/get',(req,res) => groupController.getSpecificGroups(req,res));

groupRouter.get('/create',(req,res) =>groupController.getCreatePage(req,res));

groupRouter.get('/update',(req,res) =>groupController.getUpdatePage(req,res));

groupRouter.get('/join',(req,res) => groupController.getJoinPage(req,res));

groupRouter.post('/join', (req, res) => groupController.addMember(req, res));

groupRouter.post('/create', (req, res) => groupController.addGroup(req, res));

groupRouter.get('/get/:id', (req, res) => groupController.getGroupByID(req, res));

groupRouter.post('/update', (req, res) => groupController.updateGroup(req, res));

module.exports = groupRouter;