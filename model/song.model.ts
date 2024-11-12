import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title : String,
  avatar : String,
  description : String,
  singerId : String,
  like : Number,
  lyrics : String,
  audio : String,
  status: String,
  topicId : String,
  slug : String,
  deleted: {
    type : Boolean,
    default: false
  },
  deletedAt : Date
},{
  timestamps : true, 
})

const Song = mongoose.model("Song",songSchema,"songs");

export default Song;