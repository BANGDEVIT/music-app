import { Router } from "express";

import multer from "multer";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

const upload = multer();

const route : Router = Router();

import * as  controller from "../../controllers/admin/upload.controller"

route.post("/",upload.single("file"),uploadCloud.uploadSingle,controller.index)

export const uploadRoute : Router = route;