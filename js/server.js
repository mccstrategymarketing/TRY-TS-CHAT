import Cookies from "js-cookie";
import {
    ConectWSS,
    WSS
} from "/js/coonectwss"
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
    renderHistory
} from '/js/main';

export class Req {

    constructor(url) {
        this.url = url;
    }

    async getHistrory() {
        const response = await fetch(SERVER.HISTORY);
        if (!response.ok) return console.log("Error history");
        const {
            messages
        } = await response.json();
        STOREGE.ARR_MESSAGE = messages;
        renderHistory();
    }

    async verification(token = Cookies.get("token")) {
        if (!token) return false
        const auth = await fetch(SERVER.INFO_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!auth.ok) {
            return false
        }
        const result = await auth.json()
        STOREGE.USER = result.name;
        STOREGE.EMAIL = result.email;
        return true
    };
    async requestEmail(mail) {
        const response = await fetch(SERVER.USER_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: `${mail}`
            })
        });

        if (response.ok) {

            alert("Check you email")
            SETTINGS.CREATE.BLOCK.classList.remove("active")
            SETTINGS.AUTH.BLOCK.classList.add("active")
            return true
        } else {
            alert(`Code server error: $ {response.status}`);
        }
        return false
    }
}

export const serverRequest = new Req