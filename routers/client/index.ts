import { Express } from "express";

import {topicsRoute} from "../../routers/client/topics.route"

import { songsRoute } from "./songs.route";

const clientRoute = (app : Express) :void =>{
  app.use("/topics",topicsRoute),

  app.use("/songs",songsRoute)
}

export default clientRoute;