var express = require("express");
var jwt = require("jsonwebtoken");
const { Router } = require("express");
const mongoose = require("mongoose");
var User = require("../models/user"); //USER COLLECTION
var requireLogin = require("../middleware/requireLogin"); //Middleware
const bcrypt = require("bcrypt");
var route = express.Router();
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API, CLIENT_URL} = require('../config/keys.js')



//send mail
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key: SENDGRID_API
  }
}))

route.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

// route.get("/", (req, res) => {
//   res.redirect('/signin');
// });

//Sign_Up

route.post("/signUp", (req, res) => {
  var { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the field" });
  }
  res.json({ message: "successfuly posted" });
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "email_Id already exist" });
      }
      bcrypt.hash(password, 10).then((hashpassword) => {
        var user = new User({
          name,
          email,
          password: hashpassword,
          pic,
        });
        user
          .save()
          .then((user) => {
            console.log(user);
            transporter.sendMail({
                    to:user.email,
                    from:"digvijaysinh.basiya@ngivbt.edu.in",
                    subject:"signup success",
                    html:"<h1>welcome to Recycal yard family</h1>"
                })
            res.json({ message: "SAVED SUCCESSFULLY" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//Sign_In

route.post("/signIn", (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    // console.log(savedUser)
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password " });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.status(200).json({ message: "successfully signed in" });
          var token = jwt.sign({ _id: savedUser._id }, "shhhhh");
          var { _id, name, email, followers, follwing, pic } = savedUser;
          //console.log( _id, name, email)
          res.json({
            token,
            user: { _id, name, email, followers, follwing, pic },
          });
        } else {
          res.status(422).json({
            error: "Invalid email or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

route.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"digvijaysinh.basiya@ngivbt.edu.in",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h4>click below link to reset password - <br><br/> ${CLIENT_URL}/reset/${token} </h4>
                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
})


route.post('/new-password',(req,res)=>{
 const newPassword = req.body.password
 const sentToken = req.body.token
 User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
 .then(user=>{
     if(!user){
         return res.status(422).json({error:"Try again session expired"})
     }
     bcrypt.hash(newPassword,12).then(hashedpassword=>{
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser)=>{
            res.json({message:"password updated success"})
        })
     })
 }).catch(err=>{
     console.log(err)
 })
})

module.exports = route;
