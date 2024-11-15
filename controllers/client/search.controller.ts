import { Response,Request } from "express";
import FavoriteSong from "../../model/favoriteSong.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";


//[GET] /search/:type
export const result = async(req : Request, res : Response) =>{
  try {
    const type = req.params.type;
    const keyword : string = `${req.query.keyword}`;
    
    let newSongs = [];
    if (keyword){
      const keywordRegex = new RegExp(keyword,"i");
      // tao slug ko dau co - ngan cach

      const stringSlug = convertToSlug(keyword);
      const stringSlugRegex = new RegExp(stringSlug,"i");
      const songs = await Song.find({ 
        $or :[
          {slug : stringSlugRegex},
          {title : keywordRegex} 
        ]
      })
      for(const song of songs){
        const singer = await Singer.findOne({
          _id : song.singerId,
        })

        // song["infoSinger"] = singer;
        newSongs.push({
          id : song.id,
          title : song.title,
          avatar : song.avatar,
          slug : song.slug,
          like : song.like,
          infoSinger : {
            fullName : singer.fullName
          }
        })
      }
      
      // newSongs = songs;
    }
    switch (type) {
      case "result":
        res.render("client/pages/search/result",{
          pageTitle :`Kết quả : ${keyword}`,
          keyword : keyword,
          songs : newSongs
        })
        break;
      case "suggest":
        res.json({
          code : 200,
          message : "Success",
          songs : newSongs
        })
        break;
      default:
        break;
    }
    
  } catch (error) {
    res.redirect('/')
  }
}

