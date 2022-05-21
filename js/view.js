"use strict";
// export interface chat {
//     FORM : HTMLFormElement | null
//     INPUT:   HTMLInputElement| null
//     BUTTON:   HTMLButtonElement | null
//     VIEW:   HTMLDivElement | null
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.STOREGE = exports.SERVER = exports.SETTINGS = exports.CONTROL = exports.TEMPLATE = exports.CHAT = void 0;
exports.CHAT = {
    FORM: document.querySelector(".form-message"),
    INPUT: document.querySelector(".input-message"),
    BUTTON: document.querySelector(".enter-message"),
    VIEW: document.querySelector(".view-chat"),
};
// export interface template{
//     ITEM: HTMLTemplateElement | null
//     ITEM_MESSAGE: HTMLDivElement | null
// }
exports.TEMPLATE = {
    ITEM: document.querySelector("template"),
    ITEM_MESSAGE: document.querySelector('.item-message'),
};
// export interface control{
//     SETTINGS: HTMLDivElement | null
//     LOG_OUT: HTMLDivElement | null
//     BTN_CLOSE: NodeList
// }
exports.CONTROL = {
    SETTINGS: document.querySelector(".settings"),
    LOG_OUT: document.querySelector('.log-out'),
    BTN_CLOSE: document.querySelectorAll(".btn-close")
};
// export interface settings{
//  CREATE: {
//         BLOCK: HTMLDivElement | null 
//         FORM: HTMLFormElement | null
//         INPUT: HTMLInputElement | null
//     },
//     AUTH: {
//         BLOCK: HTMLDivElement | null 
//         FORM: HTMLFormElement | null
//         INPUT: HTMLInputElement | null
//     },
//     CHANGE_NAME: {
//         BLOCK: HTMLDivElement | null 
//         FORM: HTMLFormElement | null
//         INPUT: HTMLInputElement | null
//     }
// }
exports.SETTINGS = {
    CREATE: {
        BLOCK: document.querySelector(".block.create"),
        FORM: document.querySelector('.form.create'),
        INPUT: document.querySelector(".input.create")
    },
    AUTH: {
        BLOCK: document.querySelector(".block.autorization"),
        FORM: document.querySelector('.form.autorization'),
        INPUT: document.querySelector(".input.autorization")
    },
    CHANGE_NAME: {
        BLOCK: document.querySelector(".block.chahge-name"),
        FORM: document.querySelector('.form.chahge-name'),
        INPUT: document.querySelector(".input.chahge-name")
    }
};
exports.SERVER = {
    USER_URL: "https://mighty-cove-31255.herokuapp.com/api/user",
    INFO_URL: "https://mighty-cove-31255.herokuapp.com/api/user/me",
    HISTORY: "https://mighty-cove-31255.herokuapp.com/api/messages",
    WSS: "wss://mighty-cove-31255.herokuapp.com/websockets?",
};
exports.STOREGE = {
    USER: "Я",
    ARR_MESSAGE: [],
    START: 1,
    END: 10,
};
