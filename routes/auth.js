const express = require('express');
const router = express.Router();

//import middlewares
const {authCheck} = require('../middlewares/auth')

//import controllers
const {createOrUpdateUser, currentUser} = require("../controllers/authController");


//firebase admin tool to validate the token, here frontend send the user token to our backend we will be receiving that in here



router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser); //it gives currently logged in user

module.exports = router;