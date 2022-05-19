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
    format
}
from "date-fns"
import Cookies from "js-cookie";

import {
    ConectWSS,
    WSS
} from "/js/coonectwss"

import {
    Req,
    serverRequest
} from "/js/server"

CHAT.FORM.addEventListener("submit", sendMessage);
SETTINGS.CHANGE_NAME.FORM.addEventListener("submit", changeName);
CHAT.VIEW.addEventListener("scroll", renderMessageOnScrollThrottle);

SETTINGS.CREATE.FORM.addEventListener("submit", sendEmail);

SETTINGS.AUTH.FORM.addEventListener("submit", checkAuth);


CONTROL.SETTINGS.addEventListener("click", () => {
    Cookies.get("token") ? SETTINGS.CHANGE_NAME.BLOCK.classList.add("active") :
        SETTINGS.CREATE.BLOCK.classList.add("active")
});



CONTROL.BTN_CLOSE.forEach(element => {
    element.addEventListener("click", (e) => {
        e.target.closest(".block").classList.remove("active");
    })
});


inizialization();
async function inizialization() {


    if (await serverRequest.verification() == true) {
        WSS.init()
            .then(serverRequest.verification())
            .then(serverRequest.getHistrory())
    } else {
        alert("You aren't autorization")
    }

}

async function changeName(event) {
    event.preventDefault();
    const newName = SETTINGS.CHANGE_NAME.INPUT.value;
    const token = Cookies.get("token");
    await fetch(SERVER.USER_URL, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nase: newName
        })
    }).then((response) => {
        console.log(response.ok ? response.ok : response.status)
    }).catch(res => console.log(res.status))
    STOREGE.USER = newName;
}



export class NewMessage {
    constructor(message) {
        const {
            text,
            user: {
                email,
                name
            },
            _v,
            updatedAt,
            createdAt,
            id
        } = message;


        this.email = email;
        this.text = text;
        this.name = name == STOREGE.USER ? STOREGE.USER : name;
        this.time = createdAt || getTime(new Date());

        // console.log(text, name, email,
        //     createdAt);
    }
    createMessage() {
        this.newMessageItem = TEMPLATE.ITEM.content.cloneNode(true);
        this.blockItem = this.newMessageItem.querySelector(".item-message");
        this.messageItem = this.newMessageItem.querySelector(".show-text");
        this.itemChatName = this.newMessageItem.querySelector(".whois")

        this.time = format(new Date(), "HH:mm");
        this.timeItem = this.newMessageItem.querySelector(".time");
        this.blockItem.classList.add(this.email == STOREGE.EMAIL ? "me" : "oponent");

        this.itemChatName.innerText = this.email == STOREGE.EMAIL ? STOREGE.USER : this.name;
        this.messageItem.innerText = this.text;
        this.timeItem.innerText = this.time;

        return this.newMessageItem
    }

    appendItemMessage = () => CHAT.VIEW.append(this.createMessage());
    prependItem = () => CHAT.VIEW.prepend(this.createMessage());

}


function sendMessage(e) {
    e.preventDefault();
    const {
        value
    } = CHAT.INPUT;
    WSS.sendMessage(value);

    CHAT.FORM.reset();
};


export function renderHistory() {
    for (let i = STOREGE.START; i < STOREGE.END; i++) {
        const onceMessage = new NewMessage(STOREGE.ARR_MESSAGE[STOREGE.ARR_MESSAGE.length - [i]])
        onceMessage.createMessage();
        onceMessage.appendItemMessage(CHAT.VIEW);
    }
    STOREGE.START += 5
    STOREGE.END += 5
};



function renderMessageOnScrollThrottle(e) {
    const positionScroll = CHAT.VIEW.scrollTop - CHAT.VIEW.offsetHeight;
    const threshold = positionScroll + CHAT.VIEW.scrollHeight <= 66;
    threshold ? renderHistory() : false
}



function sendEmail(e) {
    e.preventDefault();
    const {
        value
    } = SETTINGS.CREATE.INPUT;
    validEMail(value) ? serverRequest.requestEmail(value) : alert("Try valid email");
}

function validEMail(mail) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(mail).toLocaleLowerCase());
}


async function checkAuth(e) {
    e.preventDefault();
    const {
        value
    } = SETTINGS.AUTH.INPUT;
    if (await serverRequest.verification(value)) {
        SETTINGS.AUTH.BLOCK.classList.remove("active");
        Cookies.set("token", value)
        inizialization()
    } else {
        alert("Invalid code")
    };
};

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