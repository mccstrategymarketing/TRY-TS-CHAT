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
exports.serverRequest = exports.Req = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const view_1 = require("../js/view");
const main_1 = require("../js/main");
class Req {
    constructor() {
    }
    getHistrory() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(view_1.SERVER.HISTORY);
            if (!response.ok)
                return console.log("Error history");
            const { messages } = yield response.json();
            view_1.STOREGE.ARR_MESSAGE = messages;
            (0, main_1.renderHistory)();
        });
    }
    verification(token = js_cookie_1.default.get("token")) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                return false;
            const auth = yield fetch(view_1.SERVER.INFO_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!auth.ok) {
                return false;
            }
            const result = yield auth.json();
            view_1.STOREGE.USER = result.name;
            view_1.STOREGE.EMAIL = result.email;
            return true;
        });
    }
    ;
    requestEmail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(view_1.SERVER.USER_URL, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: `${mail}`
                })
            });
            if (response.ok) {
                alert("Check you email");
                view_1.SETTINGS.CREATE.BLOCK.classList.remove("active");
                view_1.SETTINGS.AUTH.BLOCK.classList.add("active");
                return true;
            }
            else {
                alert(`Code server error: $ {response.status}`);
            }
            return false;
        });
    }
}
exports.Req = Req;
exports.serverRequest = new Req;
