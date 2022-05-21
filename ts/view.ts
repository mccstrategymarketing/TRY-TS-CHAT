// export interface chat {
//     FORM : HTMLFormElement | null
//     INPUT:   HTMLInputElement| null
//     BUTTON:   HTMLButtonElement | null
//     VIEW:   HTMLDivElement | null
// }

export const CHAT  = {
    FORM: document.querySelector(".form-message") as HTMLFormElement ,
    INPUT: document.querySelector(".input-message") as HTMLInputElement,
    BUTTON: document.querySelector(".enter-message") as HTMLButtonElement ,
    VIEW: document.querySelector(".view-chat") as HTMLDivElement ,
}

// export interface template{
//     ITEM: HTMLTemplateElement | null
//     ITEM_MESSAGE: HTMLDivElement | null
// }

export const TEMPLATE  = {
    ITEM: document.querySelector("template") as HTMLTemplateElement,
    ITEM_MESSAGE: document.querySelector('.item-message') as HTMLDivElement,
}

// export interface control{
//     SETTINGS: HTMLDivElement | null
//     LOG_OUT: HTMLDivElement | null
//     BTN_CLOSE: NodeList
// }

export const CONTROL = {
    SETTINGS: document.querySelector(".settings") as HTMLDivElement,
    LOG_OUT: document.querySelector('.log-out') as HTMLDivElement,
    BTN_CLOSE: document.querySelectorAll(".btn-close") as NodeList
}

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

export const SETTINGS  = {
    CREATE: {
        BLOCK: document.querySelector(".block.create") as HTMLDivElement ,
        FORM: document.querySelector('.form.create') as HTMLFormElement,
        INPUT: document.querySelector(".input.create") as HTMLInputElement 
    },
    AUTH: {
        BLOCK: document.querySelector(".block.autorization") as HTMLDivElement,
        FORM: document.querySelector('.form.autorization') as HTMLFormElement,
        INPUT: document.querySelector(".input.autorization") as HTMLInputElement 
    },
    CHANGE_NAME: {
        BLOCK: document.querySelector(".block.chahge-name") as HTMLDivElement,
        FORM: document.querySelector('.form.chahge-name') as HTMLFormElement,
        INPUT: document.querySelector(".input.chahge-name") as HTMLInputElement 
    }
}
export interface server {
    USER_URL: string
    INFO_URL: string
    HISTORY:string
    WSS: string
}
export const SERVER:server = {
    USER_URL: "https://mighty-cove-31255.herokuapp.com/api/user",
    INFO_URL: "https://mighty-cove-31255.herokuapp.com/api/user/me",
    HISTORY: "https://mighty-cove-31255.herokuapp.com/api/messages",
    WSS: "wss://mighty-cove-31255.herokuapp.com/websockets?",
};

export interface storege {
    USER: string
    ARR_MESSAGE: Array<any>
    START: number
    END: number
    EMAIL?: string
}

export const STOREGE:storege = {
    USER: "Я",
    ARR_MESSAGE: [],
    START: 1,
    END: 10,
}