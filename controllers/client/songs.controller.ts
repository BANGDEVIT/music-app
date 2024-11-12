import { Request,Response } from "express"
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

//[GET] /songs/:slugTopic
export const list = async(req : Request,res:Response) => {
  try {
    const topic = await Topic.findOne({
      slug : req.params.slugTopic,
      deleted : false,
      status : "active"
    })

    const songs = await Song.find({
      topicId : topic.id,
      deleted : false,
      status : "active"
    }).select("avatar title slug singerId like")

    for(const song of songs){
      const infoSinger = await Singer.findOne({
        _id : song.singerId,
        deleted : false,
      })
      song["infoSinger"] = infoSinger;
    }
    
    res.render("client/pages/songs/list",{
      pageTitle: topic.title,
      songs : songs,
    });
  } catch (error) {
    res.redirect("/")
  }
}

//[GET] /songs/detail/:slugSong
export const detail = async(req : Request,res:Response) => {
  try {
    const slug : string = req.params.slugSong;

    const song = await Song.findOne({
      slug : slug,
      deleted : false,
      status : "active"
    })

    const singer = await Singer.findOne({
      _id : song.singerId,
      deleted : false,
    })

    const topic = await Topic.findOne({
      _id : song.topicId,
      deleted : false
    })

    song["inforSinger"] = singer;

    res.render("client/pages/songs/detail",{
      pageTitle: "chi tiết Bài hát",
      song : song,
      singer : singer,
      topic : topic
    })
  } catch (error) {
    res.redirect("/")
  }
}

//[PATCH] /songs/like/:typeLike/:idSong
export const like = async(req : Request,res:Response) => {
  try {
    const idSong : string = req.params.idSong; 
    const typeLike : string = req.params.typeLike;


    const song = await Song.findOne({
      _id : idSong,
      deleted : false,
      status : "active"
    })
    const newLike : number = typeLike == "like" ? song.like +1 : song.like -1;
    await Song.updateOne({
      _id : idSong
    },{
      like : newLike
    })
    //like:["id1"]

    res.json({
      code : 200,
      message : "Like thành công",
      like : newLike
    })
  } catch (error) {
    res.redirect("/")
  }
}