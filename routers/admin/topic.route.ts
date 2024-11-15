import { Router } from "express";

const route : Router = Router();

import * as  controller from "../../controllers/admin/topic.controller"

route.get("/",controller.index)

export const topicRoute : Router = route;