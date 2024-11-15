import { Router } from "express";
import multer from "multer";

const route : Router = Router();

import * as  controller from "../../controllers/admin/song.controller"

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

const upload = multer();

route.get("/",controller.index)

route.get("/create",controller.create)

route.post("/create",upload.single("avatar"),uploadCloud.uploadSingle,controller.createPost)


export const songRoute : Router = route;  