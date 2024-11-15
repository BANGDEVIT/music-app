import { Express } from "express";

import {topicsRoute} from "../../routers/client/topics.route"

import { songsRoute } from "./songs.route";

import { favoriteSongsRoute } from "./favorite-songs";

import { searchRoute } from "./search.route";

const clientRoute = (app : Express) :void =>{
  app.use("/topics",topicsRoute),

  app.use("/songs",songsRoute)

  app.use("/favorite-songs",favoriteSongsRoute)

  app.use("/search",searchRoute)
}

export default clientRoute;