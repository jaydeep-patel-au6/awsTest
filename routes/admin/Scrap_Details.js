var express = require("express");
const mongoose = require("mongoose");
var Scrap = require('../../models/scrap_Data');

var adminRoute = express.Router();

//ALL_POST

adminRoute.get("/adminAllData",  (req, res) => {
  Scrap.find( )
    .then((mypost) => {
      res.status(200).json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});

adminRoute.delete("/deleteScrap1/:postId",  (req, res) => {
  Scrap.findByIdAndDelete({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      else {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

adminRoute.put("/updateScrap1/:postId",  (req, res) => {
  Scrap.findByIdAndUpdate({ _id: req.params.postId }, {status:req.body.status})
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
  });
    
    // .exec((err, post) => {
    //   if (err || !post) {
    //     return res.status(422).json({ error: err });
    //   }
    //   else {
    //     post
          // .then((result) => {
          //   res.json(result);
          // })
          // .catch((err) => {
          //   console.log(err);
          // });
    //   }
    // });
});


module.exports =adminRoute;
