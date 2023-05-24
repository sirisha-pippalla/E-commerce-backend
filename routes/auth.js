const express = require('express');
const router = express.Router();

//import controllers
const {createOrUpdateUser} = require("../controllers/authController");

//firebase admin tool to validate the token, here frontend send the user token to our backend we will be receiving that in here



router.post('/create-or-update-user', createOrUpdateUser);

module.exports = router;