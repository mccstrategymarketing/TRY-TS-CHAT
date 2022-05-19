import {
    CHAT,
    TEMPLATE,
    CONTROL,
    SETTINGS,
    SERVER,
    STOREGE
}
from "/js/view.js";
import {
    Req,
    serverRequest
} from "/js/server"
import {
    NewMessage
} from "/js/main"

import Cookies from "js-cookie";



export class ConectWSS {

    constructor() {}

    async init() {
        this.soket = new WebSocket(`${SERVER.WSS}${Cookies.get("token")}`);
        this.soket.onopen = () => console.log("Open Soket");
        this.soket.onclose = () => this.init();
        this.soket.onmessage = (e) => {
            this.message = new NewMessage(JSON.parse(e.data))
            this.message.prependItem();
        };
    };
    sendMessage(message) {
        this.soket.send(
            JSON.stringify({
                text: message,
            }))
    }
}
export const WSS = new ConectWSS;