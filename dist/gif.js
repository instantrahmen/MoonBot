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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const base_url_tenor = `https://api.tenor.com/v1/random`;
const TENOR_API_KEY = process.env.TENOR_API_KEY;
exports.getRandomGif = ({ keywords = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = `?q=${keywords.join('+')}&key=${TENOR_API_KEY}`;
    try {
        const res = yield axios_1.default.get(base_url_tenor + queryParams);
        return res.data.results[0].media[0].gif.url;
    }
    catch (e) {
        console.log({ url: base_url_tenor + queryParams });
        console.error(e);
    }
    return null;
});
exports.getRandomGifs = ({ keywords = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = `?q=${keywords.join('+')}&limit=8&key=${TENOR_API_KEY}&preventCacheId=${Date.now()}`;
    try {
        const res = yield axios_1.default.get(base_url_tenor + queryParams);
        const urls = res.data.results.map(({ url }) => url);
        return urls;
    }
    catch (e) {
        console.log({ url: base_url_tenor + queryParams });
        console.error(e);
    }
    return [''];
});
const download = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = `static/${path.basename(url)}`;
    const writer = fs.createWriteStream(imagePath);
    const response = yield axios_1.default({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(imagePath));
        writer.on('error', reject);
    });
});
exports.downloadImages = images => {
    const downloadedImages = images.map((uri, i) => __awaiter(void 0, void 0, void 0, function* () { return yield download(uri); }));
    return downloadedImages;
};
//# sourceMappingURL=gif.js.map