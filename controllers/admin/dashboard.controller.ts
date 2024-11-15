import { Response,Request } from "express";
import FavoriteSong from "../../model/favoriteSong.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";


//[GET] /admin/dashboard
export const index = (req: Request, res: Response) =>{
  res.render("admin/pages/dashboard/index", {
    pageTitle : "Tổng quát"
  })
}

