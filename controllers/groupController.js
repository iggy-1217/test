var mongoose = require('mongoose');
var Group= mongoose.model('groups')

//var groups = require('../models/group');
var loginController = require('./loginController.js');

var path = require('path');

// Get the viewable html page
const getPage =  (req, res) => {
	//Send Web Page
	//res.sendFile(path.join(__dirname + '/../views/group_test.html'));
    res.render('group',{
        title: "Groups"
    })
};

const createGroupFromRequest = (req) => {
    if(req.body.owner && req.body.group_name && req.body.group_subject && req.body.group_assignment){
        var group = {
            owner: req.body.owner,
            group_name: req.body.group_name,
            new_group_name: req.body.new_group_name,
            group_subject: req.body.group_subject,
            group_assignment: req.body.group_assignment,
            group_members: []
        };
        //var data = new Group(group);
        //data.save();
        //const group = {
        //    id: groups.length,
        //    owner: req.body.owner,
        //    group_name: req.body.group_name,
        //    group_subject: req.body.group_subject,
        //    group_assignment: req.body.group_assignment,
        //    group_members: []
        //};

        return group;
    }else{
        return null;
    }
};

const getAllGroups =  async (req, res) => {
    // const group = await Group
    //     .find()
    //     .exec();
    // res.send(group);
    groups = []
    try{
        const all_groups = await Group.find();

        res.render('groupInfo',{
            title:'Group List',
            groups: all_groups
        })
    }catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};

const getGroupByID = (req,res) =>{
    const group = Group.find().exec();
    if (group) {
        res.send(group);
    } else {
      res.send(["This group does not exist."]);
    }
};

const getCreatePage = (req,res) =>{
    res.render('createGroup',{
        title:'Create a Group'
    })
}

const getJoinPage = (req,res) =>{
    res.render('joinGroup',{
        title:'Join a Group'
    })
}

const getUpdatePage = (req,res) =>{
    res.render('updateGroup',{
        title:'Update a Group'
    })
}

const getSpecificGroups = async (req,res) =>{
    try {
        const group = await Group.find({group_subject: req.body.group_subject});

            if (!group[0]) {
                return res.send("Currently don't have groups with this Subject")
            }
            else{
                res.render('groupInfo',{
                    title:'Group List',
                    groups: group
                })
            }
    }catch{
        res.status(500).send();
    }
}

const addGroup = async (req,res) => {
    const group = createGroupFromRequest(req);
    //res.render('createGroup')

    if(group == null){
        res.status(400).send();
    }else{
        try{
            if(await loginController.isValidUser(req.body.owner, req.body.password)){
                //groups.push(group);
                var data = new Group(group);
                data.save();
                res.status(201).send("Successfully created group");
            }else{
                res.status(400).send("invalid credentials to create this group");
            }
        }catch{
            res.status(500).send();
        }
    }
};

const updateGroup = async (req,res) => {
    const new_group = createGroupFromRequest(req);

    if(new_group == null || !req.body.new_group_name || !req.body.password){
        res.status(400).send(); 
    }
//
    else{
        const response = await Group
            .find({group_name: req.body.group_name})
            .exec();
        const group = response[0];
        if (!group){
            return res.send("Group does not exist to update");
        }else{
            try{
                if(await loginController.isValidUser(req.body.owner, req.body.password)){
                    await Group.update({group_name: req.body.group_name},
                        {
                            group_name: req.body.new_group_name,
                            group_subject: req.body.group_subject,
                            group_assignment: req.body.group_assignment
                        });
                    console.log(await Group.find());
                    res.send("Successfully updated group");
                }else{
                    res.status(400).send("invalid credentials to update group");
                }
            }catch{
                res.status(500).send(); 
            }
        }
    }
};


const addMember = async (req, res) =>{
    try {
        if (await loginController.isValidUser(req.body.username, req.body.password)) {
            //const member = req.body.username;
            const group = await Group.find({group_name: req.body.group_name});

            if (!group[0]) {
                return res.send("This group is not exist!")
            } else {
                var result = 1;
                for (var i = 0; i < group[0].group_members.length; i++){
                    if ( await group[0].group_members[i] === req.body.username){
                        result = 0;
                        }
                    }
                }
                if (await group[0].owner === req.body.username) {
                    result = 0;
                }
                if (result === 0){
                    res.send("You already exist in this group")
                }else{
                    await group[0].group_members.push(req.body.username);
                    await group[0].save();
                    res.send("Successfully joined group")
                }


            }
        else{
            res.status(400).send("User credentials invalid");
        }
    }catch{
        res.status(500).send();
    }
};

module.exports = {
    getAllGroups,
    getGroupByID,
    getCreatePage,
    getJoinPage,
    getUpdatePage,
    addGroup,
    updateGroup,
    addMember,
    getPage,
    getSpecificGroups
};
