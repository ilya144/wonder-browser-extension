chrome.runtime.onMessage.addListener((msg) => {

    chrome.cookies.getAll({"name": "_wonder_frontend_session"}, (cookie) => {
    
        fetch("https://wondersourcing.ru/profiles/associated/"+msg.IRI, {
            method: "POST",
            body: msg.html,
            credentials: 'same-origin',
            headers:{
                cookie: cookie[0].name+"="+cookie[0].value
            }
        }).then(res => {
            console.log(res);
            if (res.status===200){                        
                res.json().then(data => {
                    SendNotification( 200, data );
                });
            } else if ( [ 204, 401, 500 ].includes(res.status) ){
                SendNotification( res.status );
            } else {
                SendNotification();
            }
        });
    });
});


function SendNotification( type, data ){
    let options;
    
    switch (type) {
        case 200:
            options = {
                type: "list",
                title: data.display_name,
                items: [
                    {title: "has_contacts", message: data.has_contacts.toString()},
                    {title: "has_links", message: data.has_links.toString()}
                ],
                message: "Получена информация"
            }
            break;

        case 204:
            options = {
                type: "basic",
                title: "Пользователь отсутствует в базе",
                message: ""
            }
            break;
        
        case 401:
            options = {
                type: "basic",
                title: "Status 401",
                message: "Необходимо авторизоваться"
            }
            break;

        case 500:
            options = {
                type: "basic",
                title: "Status 500",
                message: "Сервис временно недоступен"
            }
            break;
        
        default:
            options = {
                type: "basic",
                title: "Неизвестная ошибка",
                message: "Сервис временно недоступен"
            }
            break;
    }

    options.iconUrl = "img/wondersourcing-logo.svg";
    return chrome.notifications.create(options);
}
