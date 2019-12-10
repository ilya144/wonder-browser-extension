/* global pako, chrome, React, App */

/**
 * Функция удаляет из DOM все блоки с указанным тегом
 * 
 * @param {document} DOM - объект виртульного DOM
 * @param {string} tagName - название тега
 */
function removeTags(DOM, tagName){
    Array.from(DOM.getElementsByTagName(tagName)).map((e) => e.remove());
}

/**
 * Функция отправки html страницы
 * без тегов style и script
 * в формате gzip
 */
function sendToStorageHTML(){
    
    const virtualDOM = document.implementation.createHTMLDocument("virtual");
    virtualDOM.body.innerHTML = document.body.innerHTML;
    ["style", "script"].map((tag) => removeTags(virtualDOM.body, tag));

    const payload = pako.gzip(
        virtualDOM.body.innerHTML,
        {to: "string"}
    );

    const hostname = window.location.hostname;
    const windowPathname = window.location.pathname;
    const pathname = windowPathname.endsWith("/") ?
                        windowPathname.slice(0, -1) : windowPathname;
    
    chrome.runtime.sendMessage({
        "IRI": encodeURIComponent(hostname + pathname),
        "html": payload,
        "type": "gzip",
    });
}

/**
 * Проверка pathname страницы на соответствие
 * с регулярным выражением
 * 
 * В случае успеха вызывается функция отправки
 * html страницы
 * 
 * @param {RegExp} regexp - регулярное выражение
 */
function matchInPathname(regexp){
    if (window.location.pathname.match(regexp)){
        sendToStorageHTML();
    }
}

/**
 * Точка входа плагина
 * 
 * функция проверяет url страницы на соответствие
 * с хостами в списке и вызывает функцию проверки pathname
 */
function matchInHostname(){
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

matchInHostname();
