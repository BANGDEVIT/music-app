import { Router } from "express";
import multer from "multer";

const route : Router = Router();

import * as  controller from "../../controllers/admin/song.controller"

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

const upload = multer();

route.get("/",controller.index)

route.get("/create",controller.create)

route.post("/create",upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),uploadCloud.uploadFields,controller.createPost)

route.get("/edit/:id",controller.edit)

route.patch("/edit/:id",upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),uploadCloud.uploadFields,controller.editPatch)

route.get("/detail/:id",controller.detail)



export const songRoute : Router = route;