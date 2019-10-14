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

    let pathname;
    if (window.location.pathname.endsWith("/")) {
        pathname = window.location.pathname.slice(0, -1);
    } else {
        pathname = window.location.pathname;
    }
    chrome.runtime.sendMessage({
        "IRI": encodeURIComponent(window.location.hostname + pathname),
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
            matchInPathname("users/[0-9]+/[\.a-zа-яё%\d_\-]+/?$");
            break;

        case "github.com":
            matchInPathname("(?!settings$|none$|no$|nope$|null$|github$)[0-9\.a-zа-яё\%_\-]+/?$");
            break;

        case "moikrug.ru":
            matchInPathname("(?!vacancies$|none$|no$|nope$|null$|resumes$|companies$|salaries$|courses$)[0-9\.a-zа-яё\%_\-]+/?$")
            break;
            
        case "vk.com":
            matchInPathname("(?!feed$|settings$|none$|no$|nope$|null$)[\.0-9a-zd_\-]+/?$");
            break;
        
        case "twitter.com":
            matchInPathname("(?!settings$|none$|no$|nope$|null$)[\.a-z@0-9_\-]+/?$");
            break;

        case "fb.com":
        case "facebook.com":
            matchInPathname("profile\.php\?id\=(\d+)/?$");
            matchInPathname("(?!groups(/|$)|profile(/|$)|app_scoped_user_id(/|$))[\.a-zа-яё\%0-9_\-]+/?$")
            break;

        case "habr.com":
        case "habrahabr.ru":
            matchInPathname("users/([\.a-zа-яё\%0-9_\-]+)/?$");
            break;

        case "linkedin.com":
            matchInPathname("in/([\.a-zа-яё\%\d_\-]+)/?$");
            matchInPathname("pub/([\.a-zа-яё\%0-9_\-]+)/[\.a-zа-яё\%0-9_\-]+/?$")
            break;

        case "toster.ru":
            matchInPathname("user/([\.a-zа-яё\%0-9_\-]+)/?$");
            break;
        
        default:
            break;
    }

    if (Hostname.includes("github.io")){
        if (Hostname.match("([a-zа-яё\%0-9_\-]+).github.io/?$")){
            sendToStorageHTML();
        }
    }
}

chrome.storage.sync.get("dump", (dump_on) => {
    if (dump_on) {
        dumpHTML();
    }
});
