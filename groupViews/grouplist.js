const groups = require('../models/group.js');

// get access to the button and set up a click event handler

const button = document.getElementById("Search");

button.onclick = function(){
    document.getElementById("search").action = "http://localhost:3000/groups";
}