"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topics_route_1 = require("../../routers/client/topics.route");
const songs_route_1 = require("./songs.route");
const favorite_songs_1 = require("./favorite-songs");
const search_route_1 = require("./search.route");
const clientRoute = (app) => {
    app.use("/topics", topics_route_1.topicsRoute),
        app.use("/songs", songs_route_1.songsRoute);
    app.use("/favorite-songs", favorite_songs_1.favoriteSongsRoute);
    app.use("/search", search_route_1.searchRoute);
};
exports.default = clientRoute;
