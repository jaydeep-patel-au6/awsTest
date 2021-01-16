const mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic:{
    type:String,
    default:"https://res.cloudinary.com/djztjkizu/image/upload/v1589359500/sample.jpg"
  },
  resetToken:String,
  expireToken:Date,
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
