"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const favoriteSong_model_1 = __importDefault(require("../../model/favoriteSong.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topic = yield topic_model_1.default.findOne({
            slug: req.params.slugTopic,
            deleted: false,
            status: "active"
        });
        const songs = yield song_model_1.default.find({
            topicId: topic.id,
            deleted: false,
            status: "active"
        }).select("avatar title slug singerId like");
        for (const song of songs) {
            const infoSinger = yield singer_model_1.default.findOne({
                _id: song.singerId,
                deleted: false,
            });
            song["infoSinger"] = infoSinger;
        }
        res.render("client/pages/songs/list", {
            pageTitle: topic.title,
            songs: songs,
        });
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slugSong;
        const song = yield song_model_1.default.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        });
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false
        });
        const favoriteSong = yield favoriteSong_model_1.default.findOne({
            songId: song.id
        });
        song["isFavoriteSong"] = favoriteSong ? true : false;
        res.render("client/pages/songs/detail", {
            pageTitle: "chi tiết Bài hát",
            song: song,
            singer: singer,
            topic: topic
        });
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const typeLike = req.params.typeLike;
        const song = yield song_model_1.default.findOne({
            _id: idSong,
            deleted: false,
            status: "active"
        });
        const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            like: newLike
        });
        res.json({
            code: 200,
            message: "Like thành công",
            like: newLike
        });
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const typeFavorite = req.params.typeFavorite;
        switch (typeFavorite) {
            case "favorite":
                const existFavoriteSong = yield favoriteSong_model_1.default.findOne({
                    songId: idSong
                });
                if (!existFavoriteSong) {
                    const record = new favoriteSong_model_1.default({
                        songId: idSong
                    });
                    yield record.save();
                }
                break;
            case "unfavorite":
                yield favoriteSong_model_1.default.deleteOne({
                    songId: idSong
                });
                break;
            default:
                break;
        }
        res.json({
            code: 200,
            message: "Like thành công"
        });
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSong = req.params.idSong;
        const song = yield song_model_1.default.findOne({
            _id: idSong,
            deleted: false,
            status: "active"
        });
        const newListen = song.listen + 1;
        yield song_model_1.default.updateOne({
            _id: idSong
        }, {
            listen: newListen
        });
        const songNew = yield song_model_1.default.findOne({ _id: idSong });
        res.json({
            code: 200,
            listen: songNew.listen
        });
    }
    catch (error) {
        res.redirect("/");
    }
});
exports.listen = listen;
