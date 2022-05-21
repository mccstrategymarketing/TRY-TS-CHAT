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
exports.WSS = exports.ConectWSS = void 0;
const view_1 = require("../js/view");
const main_1 = require("../js/main");
const js_cookie_1 = __importDefault(require("js-cookie"));
class ConectWSS {
    constructor() {
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.soket = new WebSocket(`${view_1.SERVER.WSS}${js_cookie_1.default.get("token")}`);
            this.soket.onopen = () => console.log("Open Soket");
            this.soket.onclose = () => this.init();
            this.soket.onmessage = (e) => {
                this.message = new main_1.NewMessage(JSON.parse(e.data));
                this.message.prependItem();
            };
        });
    }
    ;
    sendMessage(message) {
        this.soket.send(JSON.stringify({
            text: message,
        }));
    }
}
exports.ConectWSS = ConectWSS;
exports.WSS = new ConectWSS;
