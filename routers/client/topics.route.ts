import { Router } from "express";

const route : Router = Router();

import * as controller from "../../controllers/client/topics.controller"

route.get("/",controller.topics);

export const topicsRoute = route;