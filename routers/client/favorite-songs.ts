import { Router } from "express";

const route : Router = Router();

import * as  controller from "../../controllers/client/favorite-songs.controller"

route.get("/",controller.index)

export const favoriteSongsRoute : Router = route;