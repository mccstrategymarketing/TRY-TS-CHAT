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
exports.renderHistory = exports.NewMessage = void 0;
const view_1 = require("../js/view");
const date_fns_1 = require("date-fns");
const js_cookie_1 = __importDefault(require("js-cookie"));
const coonectwss_1 = require("../js/coonectwss");
const server_1 = require("../js/server");
const fp_1 = require("date-fns/fp");
view_1.CHAT.FORM.addEventListener("submit", sendMessage);
view_1.SETTINGS.CHANGE_NAME.FORM.addEventListener("submit", changeName);
view_1.CHAT.VIEW.addEventListener("scroll", renderMessageOnScrollThrottle);
view_1.SETTINGS.CREATE.FORM.addEventListener("submit", sendEmail);
view_1.SETTINGS.AUTH.FORM.addEventListener("submit", checkAuth);
view_1.CONTROL.SETTINGS.addEventListener("click", () => {
    js_cookie_1.default.get("token") ? view_1.SETTINGS.CHANGE_NAME.BLOCK.classList.add("active") :
        view_1.SETTINGS.CREATE.BLOCK.classList.add("active");
});
view_1.CONTROL.BTN_CLOSE.forEach(element => {
    element.addEventListener("click", (e) => {
        e.target.closest(".block").classList.remove("active");
    });
});
inizialization();
function inizialization() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield server_1.serverRequest.verification()) == true) {
            coonectwss_1.WSS.init()
                .then(respose => { server_1.serverRequest.verification(); })
                .then(response => { server_1.serverRequest.getHistrory(); });
        }
        else {
            alert("You aren't autorization");
        }
    });
}
function changeName(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const newName = view_1.SETTINGS.CHANGE_NAME.INPUT.value;
        const token = js_cookie_1.default.get("token");
        yield fetch(view_1.SERVER.USER_URL, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nase: newName
            })
        }).then((response) => {
            console.log(response.ok ? response.ok : response.status);
        }).catch(res => console.log(res.status));
        view_1.STOREGE.USER = newName;
    });
}
class NewMessage {
    constructor(message) {
        this.appendItemMessage = () => view_1.CHAT.VIEW.append(this.createMessage());
        this.prependItem = () => view_1.CHAT.VIEW.prepend(this.createMessage());
        const { text, user: { email, name }, _v, updatedAt, createdAt, id } = message;
        this.email = email;
        this.text = text;
        this.name = name == view_1.STOREGE.USER ? view_1.STOREGE.USER : name;
        this.time = createdAt || (0, fp_1.getTime)(new Date());
        // console.log(text, name, email,
        //     createdAt);
    }
    createMessage() {
        this.newMessageItem = view_1.TEMPLATE.ITEM.content.cloneNode(true);
        this.blockItem = this.newMessageItem.querySelector(".item-message");
        this.messageItem = this.newMessageItem.querySelector(".show-text");
        this.itemChatName = this.newMessageItem.querySelector(".whois");
        this.time = (0, date_fns_1.format)(new Date(), "HH:mm");
        this.timeItem = this.newMessageItem.querySelector(".time");
        this.blockItem.classList.add(this.email == view_1.STOREGE.EMAIL ? "me" : "oponent");
        this.itemChatName.innerText = this.email == view_1.STOREGE.EMAIL ? view_1.STOREGE.USER : this.name;
        this.messageItem.innerText = this.text;
        this.timeItem.innerText = this.time;
        return this.newMessageItem;
    }
}
exports.NewMessage = NewMessage;
function sendMessage(e) {
    e.preventDefault();
    const { value } = view_1.CHAT.INPUT;
    coonectwss_1.WSS.sendMessage(value);
    view_1.CHAT.FORM.reset();
}
;
function renderHistory() {
    for (let i = view_1.STOREGE.START; i < view_1.STOREGE.END; i++) {
        const onceMessage = new NewMessage(view_1.STOREGE.ARR_MESSAGE[view_1.STOREGE.ARR_MESSAGE.length - i]);
        onceMessage.createMessage();
        onceMessage.appendItemMessage();
    }
    view_1.STOREGE.START += 5;
    view_1.STOREGE.END += 5;
}
exports.renderHistory = renderHistory;
;
function renderMessageOnScrollThrottle(e) {
    const positionScroll = view_1.CHAT.VIEW.scrollTop - view_1.CHAT.VIEW.offsetHeight;
    const threshold = positionScroll + view_1.CHAT.VIEW.scrollHeight <= 66;
    threshold ? renderHistory() : false;
}
function sendEmail(e) {
    e.preventDefault();
    const { value } = view_1.SETTINGS.CREATE.INPUT;
    validEMail(value) ? server_1.serverRequest.requestEmail(value) : alert("Try valid email");
}
function validEMail(mail) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(mail).toLocaleLowerCase());
}
function checkAuth(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const { value } = view_1.SETTINGS.AUTH.INPUT;
        if (yield server_1.serverRequest.verification(value)) {
            view_1.SETTINGS.AUTH.BLOCK.classList.remove("active");
            js_cookie_1.default.set("token", value);
            inizialization();
        }
        else {
            alert("Invalid code");
        }
        ;
    });
}
;
// console.log(ver.verification())
// const SOCKET = new ConnectSocket();
// function ConnectSocket() {
//     this.sendMessage = (text) => this.socket.send(JSON.stringify({
//         text
//     }));
//     this.checkMessage = () => this.socket.addEventListener("message", this.renderMessage);
//     this.renderMessage = (e) => {
//         const message = new NewMessage(JSON.parse(e.data));
//         message.prependItem(CHAT.VIEW);
//         scrollToBottom();
//     };
//     this.checkClose = () => {
//         this.socket.addEventListener("close", e => {
//             if (e.wasClean) {
//                 console.log(` [close] Соединение закрыто чисто, код = $ {
// // e.code
// // }
// // причина = $ {
// //     e.reason
// // }
// `);
// //             } else {
// //                 console.log("[close] Соединение прервано");
// //                 const token = Cookies.get('token');
// //                 this.init(token);
// //             }
// //         })
// //     }
// //     this.init = (token) => {
// //         this.socket = new WebSocket(`
// $ {
//     SERVER.SOCKET
// }
// $ {
//     token
// }
// `);
// //         this.checkMessage();
// //         this.checkClose();
// //     };
// //     this.disconnect = () => {
// //         this.socket.close(1000, "Работа закончена");
// //     };
// // };
// // initChat();
// // SETTINGS.AUTH.FORM.addEventListener("submit", sendAuth);
// // CONTROL.LOG_OUT.addEventListener("click", () => {
// //     Cookies.remove("token");
// // });
// // function validEMail(mail) {
// //     const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// //     return regexp.test(String(mail).toLocaleLowerCase());
// // }
// // async function requestEmail(mail) {
// //     const response = await fetch(SERVER.USER_URL, {
// //         headers: {
// //             'Content-Type': 'application/json'
// //         },
// //         method: 'POST',
// //         body: JSON.stringify({
// //             email: `
// $ {
//     mail
// }
// `
// //         })
// //     });
// //     if (response.status == 200) {
// //         alert("Check you email")
// //         SETTINGS.CREATE.BLOCK.classList.remove("active")
// //         SETTINGS.AUTH.BLOCK.classList.add("active")
// //     } else {
// //         alert(`
// Code server error: $ {
//     response.status
// }
// `)
// //     }
// // };
// // async function changeName(e) {
// //     e.preventDefault();
// //     const {
// //         value
// //     } = SETTINGS.CHANGE_NAME.INPUT;
// //     const token = Cookies.get("token");
// //     const response = await fetch(SERVER.USER_URL, {
// //         headers: {
// //             Authorization: `
// Bearer $ {
//     token
// }
// `,
// //             'Content-Type': 'application/json'
// //         },
// //         method: "PATCH",
// //         body: JSON.stringify({
// //             name: value
// //         }),
// //     })
// //     if (response.status == 200) {
// //         alert("Chat name change")
// //     } else {
// //         console.log("Error " +
// //             response.status);
// //     }
// // }
// // async function getUserInfo(token = Cookies.get("token")) {
// //     const response = await fetch(SERVER.INFO_URL, {
// //         headers: {
// //             Authorization: `
// Bearer $ {
//     token
// }
// `,
// //         }
// //     })
// //     if (response.ok) {
// //         const res = await response.json();
// //         STOREGE.EMAIL = res.email;
// //         return true;
// //     }
// // }
// // async function initChat() {
// //     if (!getUserInfo()) return alert("Вы неавторизованы")
// //     const response = await fetch(SERVER.HISTORY)
// //         .then(res => res.json()).then(({
// //             messages
// //         }) => {
// //             STOREGE.ARR_MESSAGE = messages;
// //             renderMessages(messages);
// //             const token = Cookies.get('token');
// //             SOCKET.init(token);
// //         });
// // };
// // function renderMessages(messages) {
// //     for (let i = STOREGE.START; i < STOREGE.END; i++) {
// //         // console.log(STOREGE.ARR_MESSAGE[STOREGE.ARR_MESSAGE.length - [i]])
// //         const onceMessage = new NewMessage(STOREGE.ARR_MESSAGE[STOREGE.ARR_MESSAGE.length - [i]])
// //         onceMessage.createMessage();
// //         onceMessage.appendItemMessage(CHAT.VIEW);
// //     }
// //     STOREGE.START += 4;
// //     STOREGE.END += 4;
// // }
// // function sendMessage(e) {
// //     e.preventDefault();
// //     const {
// //         value
// //     } = CHAT.INPUT;
// //     // console.log(value);
// //     if (!value) return;
// //     SOCKET.sendMessage(value);
// //     CHAT.FORM.reset()
// // };
// // function scrollToBottom() {
// //     const element = CHAT.VIEW.firstElementChild;
// //     const options = {
// //         block: "end",
// //         behavior: "smooth"
// //     };
// //     element.scrollIntoView(options);
// // }
