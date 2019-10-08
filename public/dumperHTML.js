console.log("I'm alive");

function removeTags(DOM, tagName){
    Array.from(DOM.getElementsByTagName(tagName)).map((e) => e.remove());
}

function sendToStorageHTML(){
    console.log("start sending dump");
    
    const virtualDOM = document.implementation.createHTMLDocument("virtual");
    virtualDOM.body.innerHTML = document.body.innerHTML;
    ["style", "script"].map((tag) => removeTags(virtualDOM.body, tag));

    const payload = pako.gzip(
        virtualDOM.body.innerHTML,
        {to: "string"}
    );
    chrome.runtime.sendMessage({
        "IRI": window.location.hostname + window.location.pathname
        "html": payload,
        "type": "gzip",
        "resolved": false,
        "verbose": "only body without scripts and styles"

    }, () => console.log("HTML sended successfuly"));
    // chrome.storage.sync.set({
    //     "parsed_html": {
    //         [window.location.href] : {
    //             "html": payload,
    //             "type": "gzip",
    //             "resolved": false
    //         }
    //     }
    // }, () => console.log("HTML sended successfuly"));
}

function matchInPathname(regexp){
    console.log("start checking regexp");
    if (window.location.pathname.match(regexp)){
        console.log("regexp passed");
        sendToStorageHTML();
    }
}

function dumpHTML(){
    console.log("start switch");
    const Hostname = window.location.hostname
    switch (window.location.hostname) {
        case "stackoverflow.com":
        case "ru.stackoverflow.com":
            matchInPathname("users/[0-9]+/[\.a-zа-яё%\d_\-]+$/?");
            break;

        case "github.com":
            matchInPathname("(?!settings$|none$|no$|nope$|null$|github$)[0-9\.a-zа-яё\%_\-]+$/?");
            break;
            
        case "vk.com":
            matchInPathname("(?!feed$|settings$|none$|no$|nope$|null$)[0-9a-zd_\-\.]+$/?");
            break;
        
        case "twitter.com":
            matchInPathname("(?!settings$|none$|no$|nope$|null$)[\.a-z@0-9_\-]+$/?");
            break;

        case "fb.com":
        case "facebook.com":
            matchInPathname("profile\.php\?id\=(\d+)/i");
            matchInPathname("(?!groups(/|$)|profile(/|$)|app_scoped_user_id(/|$))[\.a-zа-яё\%0-9_\-]+$/?")
            break;

        case "habr.com":
        case "habrahabr.ru":
            matchInPathname("users/([\.a-zа-яё\%0-9_\-]+)$/?");
            break;

        case "linkedin.com":
            matchInPathname("in/([a-zа-яё\%\d_\-\.]+)$");
            matchInPathname("pub/([a-zа-яё\%0-9_\-\.]+)/[\.a-zа-яё\%0-9_\-]+$/?") // убрал из последнего [] знак /
            break;

        case "toster.ru":
            matchInPathname("user/([\.a-zа-яё\%0-9_\-]+)$/?");
            break;
        
        default:
            break;
    }

    if (Hostname.includes("github.io")){
        if (Hostname.match("([a-zа-яё\%0-9_\-]+).github.io")){
            sendToStorageHTML();
        }
    }
}

chrome.storage.sync.get("dump", (dump_on) => {
    if (dump_on) {
        dumpHTML();
    }
});


/*
/^(?:https?:)?github.com\/(?!settings$|none$|no$|nope$|null$|github$)[a-zа-яё\%\d_\-\.]+$/i
/^(?:https?:)?([a-zа-яё\%\d_\-]+).github.io/i
/^(?:https?:)?vk.com\/(?!feed$|settings$|none$|no$|nope$|null$)[a-zd_\-\.]+$/i
/^(?:https?:)?twitter.com\/(?!settings$|none$|no$|nope$|null$)[a-z@\d_\-\.]+$/i
/^(?:https?:)?(ru\.)?stackoverflow.com\/users\/([\d]+)\/([a-zа-яё\%\d_\-\.]+)$/i
/^(?:https?:)?habr.com\/users\/([a-zа-яё\%\d_\-\.]+)$/i
/^(?:https?:)?habrahabr.ru\/users\/([a-zа-яё\%\d_\.\-]+)$/i
/^(?:https?:)?toster.ru\/user\/([a-zа-яё\%\d_\-\.]+)$/i
/^(?:https?:)?(facebook|fb).com\/profile\.php\?id\=(\d+)/i
/^(?:https?:)?(facebook|fb).com\/(?!groups(\/|$)|profile(\/|$)|app_scoped_user_id(\/|$))[a-zа-яё\%\d_\-\.]+$/i
/^(?:https?:)?linkedin.com\/in\/([a-zа-яё\%\d_\-\.]+)$/i
/^(?:https?:)?linkedin.com\/pub\/([a-zа-яё\%\d_\-\.]+)\/[a-zа-яё\%\d_\-\.\/]+$/i
*/