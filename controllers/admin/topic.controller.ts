import { Response,Request } from "express";
import FavoriteSong from "../../model/favoriteSong.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";
import Topic from "../../model/topic.model";


//[GET] /admin/topics
export const index = async (req: Request, res: Response) =>{
  const topics = await Topic.find({
    deleted : false
  });

  res.render("admin/pages/topics/index.pug",{
    pageTitle : "Trang Quản lí chủ đề",
    topics : topics
  })
}

