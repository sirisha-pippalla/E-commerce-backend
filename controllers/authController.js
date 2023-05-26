const { json } = require("body-parser");
const User = require("../models/user");


exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  ); //here we find the user through email so we take email as an argument, secong argument is name & picture, these two are updated, third argument is new it is optional, the benefit of new argument is this will return the updated information otherwise we get older information.

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save(); //here save()-->save the new user in database
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};


exports.currentUser = async (req, res) => {
  User.findOne({email: req.user.email}).exec((err, user) => {
    if(err)throw new Error(err);
    res.json(user);
  });
};



