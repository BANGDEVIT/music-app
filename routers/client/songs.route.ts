import { Router } from "express";

import * as controller from '../../controllers/client/songs.controller'

const route : Router = Router();

route.get("/:slugTopic",controller.list)

route.get("/detail/:slugSong",controller.detail)

route.patch("/like/:typeLike/:idSong",controller.like)

route.patch("/favorite/:typeFavorite/:idSong",controller.favorite)

route.patch("/listen/:idSong",controller.listen)



export const songsRoute : Router= route ;