Website Routes
- /login : Gets the main web page for login/registration
    - /login/verify : POST to here with username and password to login
    - /login/create : POST to here with username and password to create a user
    - /login/failed : Get failed login page

- /groups : Get tester web page for creating/joining groups
    - /groups/join : POST to here with group id, owner and password to add a user to a group
    - /groups/create : POST to here with owner, password, group_name, group_subject, group_assignment to create a group with those specified fields.
    - /groups/update : POST to here with group_name, owner, password, new_group_name, group_subject, group_assignment to update an existing group
    - /groups/get : GET all current groups
    - /groups/get/:id : GET a group with the specified id

- /achievements :
    - /achievements/:userID : GET all the achievements of a specific user
    - /achievements/:userID/:achID : GET the status of an achievment id of a specific user
    - /achievements/:userID/:achID : POST to here to unlock an achievement for a user

- /index : same as default path
- /about : about page
- /profile : sample profile page, in the future this will show achievment data/settings

To test functionality for login
1. Go to /login and enter details to register
2. On a success, go back to /login and enter details to login
3. Try enterring wrong username/password to be sent to /login/failed

To test functionality for group creation/joining/updating
1. Go to /groups sample page
2. use the create fields to create a group, you must have the username/password field match with a valid user in the system (refer to testing functionality for login to create a user)
3. User /groups/get to show all groups, you should see that your group is there
4. Try updating your group with the update field, the username/password must match those of the owner of the group
5. use /groups/get again to see that your changes applied properly
6. Use the join fields, to join a group by name (eventually this will also check a unique id to make sure multiple groups can have the same name, it will also check in the future to see if the user is a member of any groups already)
7. User /groups/get to see that your member has been added to the group

To test functionality for achievements (NOTE: This is the least developed so far as much of it is temporary and will be run on the back end since we need verification from an admin user/password to stop people from just unlocking achievements for themselves)
1. Go to /achievements, you should see a list of predefined users with achievements and values 0 or 1 signifying if they are unlocked (In the future users will be added to this list on account creation)
2. Go to /achievements/unlock/:userid/:achievementid to unlock an achievement for a specific user
3. You can then go back to /achievements to see the updated user
4. Alternatively you can get a specific user's achievements with /achivements/:userid
5. You can also see the value of a specific achievement on a specific user with /achievements/:userid/:achievementid

Additionally you can access the main website pages with 
/index or just default path
/profile
/about