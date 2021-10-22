"use strict";
let {generateAccessToken} = require('../jwt_helper')
const bcrypt = require('bcryptjs');

let User = require('../models/user');

exports.signIn = async (req,res) =>{
    try{
      if(req.body.email != "" || req.body.password != ""){
          //check if email exists
          let user = await User.findOne({email:req.body.email});
          if(user){
              //compare passwords
                let match = await bcrypt.compare(req.body.password, user.password);
                if(match){
                    //create tokens
                    let token = await generateAccessToken(user._id);

                    return res.status(200).json({token, user});
                }
                return res.json("Invalid user credentials");
          }
          return res.status(400).send("User not found");
      }
    }catch(err){
    console.log(err)
    res.send(err).status(500);
    }
}

exports.signUp = async (req, res) => {
    //check body
    try{
    //check if user email already exists
    let exists = await User.exists({email:req.body.email});
    if(!exists){
    //hash password
    const salt = await bcrypt.genSalt(10);
    let hashpass = await bcrypt.hash(req.body.password,salt);
    let user = await User.create({
        username:req.body.username,
        email:req.body.email,
        password:hashpass
    })
    //user account has beem created
    return res.json(user)
}
 return res.json("Email already taken").status(403)
}catch(err){
    if(err){
        if(err.name === 'ValidationError'){
            return res.status(400).send(Object.values(err.errors).map(val => val.message));
        }
    }
    res.send(err).status(500);
}
}