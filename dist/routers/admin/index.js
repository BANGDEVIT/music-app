"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const confix_1 = require("../../config/confix");
const adminRoute = (app) => {
    const PATH_ADMIN = `/${confix_1.systemconfix.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_route_1.dashboardRoute);
    app.use(`${PATH_ADMIN}/topics`, topic_route_1.topicRoute);
    app.use(`${PATH_ADMIN}/songs`, song_route_1.songRoute);
    app.use(`${PATH_ADMIN}/upload`, upload_route_1.uploadRoute);
};
exports.default = adminRoute;
