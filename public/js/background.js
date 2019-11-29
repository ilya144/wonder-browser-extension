/* global chrome */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    
    if (msg.type !== "gzip") return;

    sendHtml(msg, sender);
    sendResponse({
        res: "message sended"
    });
    return true;

});

async function sendHtml(msg, sender){
    chrome.cookies.getAll({"name": "_wonder_frontend_session"}, (cookie) => {
    
        fetch("https://wondersourcing.ru/profiles/associated/"+msg.IRI, {
            method: "POST",
            body: STRUINT(msg.html),
            credentials: 'same-origin',
            headers:{
                "Accept": "application/json",
                "Content-Encoding": "gzip",
                "Content-Type": "application/octet-stream",
                cookie: cookie[0] && cookie[0].name+"="+cookie[0].value
            }
        }).then(res => {
            console.log(res);
            if (res.status===200){                        
                res.json().then(data => {
                    // sendNotification( 200, data );
                    chrome.tabs.sendMessage(sender.tab.id, {
                        "IRI": msg.IRI,
                        "type": "data",
                        "data": data
                    });
                    return {
                        status: 200,
                        data
                    };
                });
            } else if ( [ 204, 401, 500 ].includes(res.status) ){
                // sendNotification( res.status );
                if (res.status===204 || res.status===500) {
                    chrome.tabs.sendMessage(sender.tab.id, {
                        "IRI": msg.IRI,
                        "type": "data",
                        "data": {
                            status: "user_not_found",
                            empty: true
                        }
                    });
                }
                if (res.status===401) {
                    chrome.tabs.sendMessage(sender.tab.id, {
                        "IRI": msg.IRI,
                        "type": "data",
                        "data": {
                            status: "unauthorized",
                            empty: true
                        }
                    });
                } 
                return {
                    status: res.status,
                    data: null
                };
            } else {
                // sendNotification();
                return {
                    status: "unknown",
                    data: null
                };
            }
        });
    });
}


function sendNotification( type, data ){
    let options;
    
    switch (type) {
        case 200:
            console.log(data);
            options = {
                type: "list",
                title: data.display_name,
                items: [
                    {
                        title: "has_contacts",
                        message: (data.has_contacts && data.has_contacts.toString()) || "null"
                    },
                    {
                        title: "has_links", 
                        message: (data.has_links && data.has_links.toString()) || "null"
                    }
                ],
                message: "Получена информация"
            }
            break;

        case 204:
            options = {
                type: "basic",
                title: "WonderSoucing",
                message: "Пользователь отсутствует в базе"
            }
            break;
        
        case 401:
            options = {
                type: "basic",
                title: "WonderSoucing",
                message: "Необходимо авторизоваться"
            }
            break;

        case 500:
            options = {
                type: "basic",
                title: "WonderSoucing",
                message: "Сервис временно недоступен"
            }
            break;
        
        default:
            options = {
                type: "basic",
                title: "WonderSoucing",
                message: "Неизвестная ошибка"
            }
            break;
    }

    options.iconUrl = "img/wondersourcing-logo.svg";
    return chrome.notifications.create(options);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    
    if (msg.type !== "contacts") return;

    const contacts = getContacts(msg.id);
    sendResponse({
        res: "message sended",
        contacts
    });
    return true;
})

function getContacts(id){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://wondersourcing.ru/profiles/${id}/contacts`, false);
    xmlhttp.withCredentials = true;
    xmlhttp.send();
  
    // console.log(xmlhttp);
    return JSON.parse(xmlhttp.responseText);
}

function STRUINT(str){
	const arr = new Uint8Array(str.length);
	for (let i = 0; i < str.length; i++){
		arr[i] = str.charCodeAt(i);
	}
	return arr;
}