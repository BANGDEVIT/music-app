import { Router } from "express";

const route : Router = Router();

import * as  controller from "../../controllers/client/search.controller"

route.get("/:type",controller.result)




export const searchRoute : Router = route;