var jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
var User = require("../models/user");
module.exports=(req,res,next)=>
{
    var {authorization}=req.headers
    if (!authorization)
    {
      return  res.status(401).json({error:"YOU MUST BE LOGGED IN"})
    }
    var token=authorization.replace("Bearer ","")
    jwt.verify(token,'shhhhh',(error,payload)=>
    {
        if (error)
        {
           return res.status(401).json({error:"you must be logged in"})
        }
        var {_id}=payload
        User.findById(_id).then((userData)=>
        {
            req.user=userData
            next()
        })
        
       
    })
}