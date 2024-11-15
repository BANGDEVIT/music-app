import { Response,Request } from "express";
import FavoriteSong from "../../model/favoriteSong.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug.helper";
import Topic from "../../model/topic.model";
import { systemconfix } from "../../config/confix";



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

  // interface Datasong {
  //   title: string,
  //   topicId: string,
  //   singerId: string,
  //   description: string,
  //   status: string,
  //   avatar: string
  // }
  let avatar = "";
  let audio = "";

  if (req.body.avatar){
    avatar = req.body.avatar[0]
  }

  if (req.body.audio){
    audio = req.body.audio[0]
  }
  const datasong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio : audio,
    lyrics : req.body.lyrics
  }
  const song = new Song(datasong);
  await song.save();
  res.redirect(`/${systemconfix.prefixAdmin}/songs`);
}

//[GET] /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) =>{
  const id = req.params.id;
  const song =  await Song.findOne({
    _id : id ,
    deleted : false
  })

  const topics = await Topic.find({
    deleted : false,
    status : "active"
  }).select("title")

  const singers = await Singer.find({
    deleted : false,
    status : "active"
  }).select("fullName")

  res.render("admin/pages/songs/edit.pug",{
    pageTitle : "chi tiết bài hát",
    song : song,
    topics:topics,
    singers : singers
  })
}

//[PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) =>{

  const id = req.params.id

  const datasong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: req.body.status,
    lyrics : req.body.lyrics
  }

  if (req.body.avatar){
    datasong['avatar'] = req.body.avatar[0]
  }

  if (req.body.audio){
    datasong['audio'] = req.body.audio[0]
  }

  console.log(id);
  await Song.updateOne({
    _id : id
  }
  ,datasong); 

  res.redirect('back')
}


//[GET] /admin/songs/detail/:id
export const detail = async (req: Request, res: Response) =>{
  res.render("admin/pages/songs/detail.pug",{
    pageTitle : "chỉnh sửa bài hát"
  })
}
