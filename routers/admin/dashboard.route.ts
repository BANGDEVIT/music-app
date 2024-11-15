import { Router } from "express";

const route : Router = Router();

import * as  controller from "../../controllers/admin/dashboard.controller"

route.get("/",controller.index)

export const dashboardRoute : Router = route;