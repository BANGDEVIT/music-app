import { Response,Request } from "express";
import FavoriteSong from "../../model/favoriteSong.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";
import Topic from "../../model/topic.model";


//[GET] /admin/songs
export const index = async (req: Request, res: Response) =>{
  const songs = await Song.find({
    deleted : false
  });

  res.render("admin/pages/songs/index.pug",{
    pageTitle : "Quản lí bài hát",
    songs : songs
  })
}

//[GET] /admin/songs/create
export const create = async (req: Request, res: Response) =>{
  const topics = await Topic.find({
    deleted : false,
    status : "active"
  }).select("title")

  const singers = await Singer.find({
    deleted : false,
    status : "active"
  }).select("fullName")

  res.render("admin/pages/songs/create.pug",{
    pageTitle : "Thêm mới bài hát",
    topics:topics,
    singers :singers
  })
}

//[POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) =>{
  console.log(req.body)
  res.send("ok")
}

