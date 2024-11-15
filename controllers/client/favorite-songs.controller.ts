import { Response,Request } from "express";
import FavoriteSong from "../../model/favoriteSong.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

//[GET] /favorite-songs
export const index = async(req : Request , res : Response) => {
  const favoriteSongs = await FavoriteSong.find({
    // userid : req.params.userid
    deleted : false
  })

  const songs =[];
  for (const favoriteSong of favoriteSongs) {
    const song = await Song.findOne({
      _id : favoriteSong.songId,
      deleted : false
    })
    const singer = await Singer.findOne({
      _id : song.singerId,
      deleted : false
    })

    song["infoSinger"] = singer;
    songs.push(song)
  }
  res.render("client/pages/favorite-songs/index",{
    pageTitle : "Bài hát yêu thích",
    songs : songs
  })
}