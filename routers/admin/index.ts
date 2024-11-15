import { Express } from "express";

import { dashboardRoute } from "./dashboard.route";

import { topicRoute } from "./topic.route";

import { songRoute } from "./song.route";

import { uploadRoute } from "./upload.route";

import { systemconfix } from "../../config/confix";

const adminRoute = (app : Express) :void =>{
  const PATH_ADMIN = `/${systemconfix.prefixAdmin}`

  app.use(`${PATH_ADMIN}/dashboard`,dashboardRoute);

  app.use(`${PATH_ADMIN}/topics`,topicRoute);

  app.use(`${PATH_ADMIN}/songs`,songRoute);

  app.use(`${PATH_ADMIN}/upload`,uploadRoute);


}

export default adminRoute;