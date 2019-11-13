/* global pako, chrome, React, App */
console.log("I'm alive");

function removeTags(DOM, tagName){
    Array.from(DOM.getElementsByTagName(tagName)).map((e) => e.remove());
}

function sendToStorageHTML(){
    console.log("start sending dump");
    
    const virtualDOM = document.implementation.createHTMLDocument("virtual");
    virtualDOM.body.innerHTML = document.body.innerHTML;
    ["style", "script"].map((tag) => removeTags(virtualDOM.body, tag));

    console.log((new TextEncoder().encode(virtualDOM.body.innerHTML)).length); //bytes inflated
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
    
    console.log(payload.length); //bytes deflated
    chrome.runtime.sendMessage({
        "IRI": encodeURIComponent(window.location.hostname + pathname),
        "html": payload,
        "type": "gzip",
        "resolved": false,
        "verbose": "only body without scripts and styles"

    }, (response) => {
        console.log(response);

        // const frameHTML = chrome.runtime.getURL("frame.hmtl");
        // var iframe = document.createElement('iframe');
        // document.body.appendChild(iframe);
        // iframe.contentDocument.srcdoc = getFrameHtml("frame.html");
        // const frame = document.createElement("iframe");
        // frame.className = "wondersourcing-frame";
        // frame.style.width = "200px";
        // frame.style.height = "100vh";
        // document.body.appendChild(frame);
        // const iDoc = frame.contentWindow.document;
        // const root = iDoc.createElement("div");
        // root.id = "root";
        // iDoc.body.appendChild(root);
        // const htmlElem = document.createElement("html");
        // htmlElem.innerHTML = getFrameHtml("frame.html");

        // iDoc.head.innerHTML = htmlElem.firstChild.innerHTML
        // iDoc.body.innerHTML = htmlElem.lastChild.innerHTML
    });
}

// function getFrameHtml(htmlFileName) {
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.open("GET", chrome.runtime.getURL(htmlFileName), false);
//     xmlhttp.send();

//     return xmlhttp.responseText;
// }

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
            matchInPathname(RegExp("^/users/[0-9]+/[\.a-zа-яё%0-9_\-]+/?$", "i"));
            break;

        case "github.com":
            matchInPathname(RegExp("^/(?!settings$|none$|no$|nope$|null$|github$)[0-9\.a-zа-яё\%_\-]+/?$", "i"));
            break;

        case "moikrug.ru":
            matchInPathname(RegExp("^/(?!vacancies$|none$|no$|nope$|null$|resumes$|companies$|salaries$|courses$)[0-9\.a-zа-яё\%_\-]+/?$", "i"));
            break;
            
        case "vk.com":
            matchInPathname(RegExp("^/(?!feed$|settings$|none$|no$|nope$|null$)[\.0-9a-zd_\-]+/?$", "i"));
            break;
        
        case "twitter.com":
            matchInPathname(RegExp("^/(?!settings$|none$|no$|nope$|null$)[\.a-z@0-9_\-]+/?$", "i"));
            break;

            case "fb.com":
            case "facebook.com":
            case "www.facebook.com":
                matchInPathname(RegExp("^/profile\.php\?id\=(0-9+)/?$", "i"));
                matchInPathname(RegExp("^/(?!groups(/|$)|profile(/|$)|app_scoped_user_id(/|$))[\.a-zа-яё\%0-9_\-]+/?$", "i"));
                matchInPathname(RegExp("^/[\.a-zа-яё\%0-9_\-]+/?$", "i"));
                break;

        case "habr.com":
        case "habrahabr.ru":
            matchInPathname(RegExp("^(/ru|/en)/users/([\.a-zа-яё\%0-9_\-]+)/?$", "i"));
            break;

        case "linkedin.com":
        case "www.linkedin.com":
            matchInPathname(RegExp("^/in/([\.a-zа-яё\%0-9_\-]+)/?$", "i"));
            matchInPathname(RegExp("^/pub/([\.a-zа-яё\%0-9_\-]+)/[\.a-zа-яё\%0-9_\-]+/?$", "i"))
            break;

        case "toster.ru":
            matchInPathname(RegExp("^/user/[\.a-zа-яё\%0-9_\-]+/?$", "i"));
            matchInPathname(RegExp("^/users/[\.a-zа-яё\%0-9_\-]+/?$", "i"));
            break;
        
        default:
            break;
    }

    if (Hostname.includes("github.io")){
        if (Hostname.match("([a-zа-яё\%0-9_\-]+).github.io/?$")){
            sendToStorageHTML();
        }
    }

    if (Hostname.includes("hh.ru")){
        matchInPathname(RegExp("^/resume/[\.a-zа-яё\%0-9_\-]+/?$", "i"))
    }
}

chrome.storage.sync.get("dump", (dump_on) => {
    if (dump_on) {
        dumpHTML();
    }
});

