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
exports.result = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const convertToSlug_helper_1 = require("../../helpers/convertToSlug.helper");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const type = req.params.type;
        const keyword = `${req.query.keyword}`;
        let newSongs = [];
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            const stringSlug = (0, convertToSlug_helper_1.convertToSlug)(keyword);
            const stringSlugRegex = new RegExp(stringSlug, "i");
            const songs = yield song_model_1.default.find({
                $or: [
                    { slug: stringSlugRegex },
                    { title: keywordRegex }
                ]
            });
            for (const song of songs) {
                const singer = yield singer_model_1.default.findOne({
                    _id: song.singerId,
                });
                newSongs.push({
                    id: song.id,
                    title: song.title,
                    avatar: song.avatar,
                    slug: song.slug,
                    like: song.like,
                    infoSinger: {
                        fullName: singer.fullName
                    }
                });
            }
        }
        switch (type) {
            case "result":
                res.render("client/pages/search/result", {
                    pageTitle: `Kết quả : ${keyword}`,
                    keyword: keyword,
                    songs: newSongs
                });
                break;
            case "suggest":
                res.json({
                    code: 200,
                    message: "Success",
                    songs: newSongs
                });
                break;
            default:
                break;
        }
    }
    catch (error) {
        res.redirect('/');
    }
});
exports.result = result;
