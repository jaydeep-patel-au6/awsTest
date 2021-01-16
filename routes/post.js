var express = require("express");
const mongoose = require("mongoose");
var Scrap = require("../models/scrap_Data");
var Post = require("../models/post");
var requireLogin = require("../middleware/requireLogin");
var route = express.Router();

//ALL_POST

route.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort('-createdAt')
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});

//CREATED_POST

route.post("/createPost", requireLogin, (req, res) => {
  var { title, body, pic } = req.body;
  //console.log(title,body,pic)
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "PLEASE ADD ALL THE FIELD" });
  }
  var post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      //  console.log(result)
      res.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//SCRAP_REQUEST
route.post("/scrapRequest", requireLogin, (req, res) => {
  var { title, quantity, addresss,pic } = req.body;
  //console.log(title,body,pic)
  if (!title || !quantity || !addresss) {
    return res.status(422).json({ error: "PLEASE ADD ALL THE FIELD" });
  }
  var post = new Scrap({
    title,
    quantity,
    addresss,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      //  console.log(result)
      res.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

//MY_POST

route.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.status(200).json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});

//SCRAP_DATA

route.get("/scrapData", requireLogin, (req, res) => {
  Scrap.find({ postedBy: req.user._id })
    .then((mypost) => {
      res.status(200).json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});

//LIKE BUTTON

route.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//UNLIKE ROUTE

route.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//COMMENT

route.put("/comment", requireLogin, (req, res) => {
  var comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

//DELETE POST

route.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
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


//DELETE SCRAP

route.delete("/deleteScrap/:postId", requireLogin, (req, res) => {
  Scrap.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
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

module.exports = route;
