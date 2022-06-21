var express = require('express');
var router = express.Router();
var User = require('../model/users');

/* user register */
router.post('/register', async (req,res,next) => {
  var user = await User.create(req.body);
  res.status(200).json({user});
})

/* user Login */
router.post('/login', async (req,res,next) => {
  var {email, password }  = req.body;
  if(!email || !password){
    res.status(400).json("Email and password is requried");
  }
  try {
    var user = await User.findOne({email});
  if(!user){
    res.status(200).json("Email is not register");
  }
  var result = await user.verifypassword(password);
  if(!result){
    res.status(400).json(" Password is invalid");
  }
  var token = await user.tokenverify();
  } catch (error) {
    next(error);
  }
})
module.exports = router;
