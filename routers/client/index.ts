import { Express } from "express";

import {topicsRoute} from "../../routers/client/topics.route"

const clientRoute = (app : Express) :void =>{
  app.use("/topics",topicsRoute)
}

export default clientRoute;