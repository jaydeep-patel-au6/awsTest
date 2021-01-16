const mongoose = require("mongoose");
var {ObjectId}=mongoose.Schema.Types

const { Schema } = mongoose;
const scrapSchema = new Schema({
    title:{type:String,required:true},
    quantity:{type:String,required:true},
    photo:{type:String,required:true},
    addresss:{type:String,required:true},
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    status:{type:String,default:"InProcess"}
})

const scrap = mongoose.model("ScrapAdminData",scrapSchema);

module.exports = scrap;
