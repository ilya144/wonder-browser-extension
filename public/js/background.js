chrome.runtime.onMessage.addListener((msg) => {
    // TODO sending html to API
    console.log(msg);
    
    fetch('https://wondersourcing.ru/users/sign_in.json',  {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({"user":{"email":"ils12rus@gmail.com","password":"pass1234","remember_me":true}}),
        mode: 'cors' }).then(res => {

        
            chrome.cookies.getAll({"name": "_wonder_frontend_session"}, (cookie) => {
                // console.log(cookie);
                fetch("https://wondersourcing.ru/profiles/associated/"+msg.IRI, {
                    method: "POST",
                    body: msg.html,
                    headers:{
                        cookie: cookie[0].name+"="+cookie[0].value
                    }
                }).then(res => res.json().then(res => console.log(res)));
            });
    });

    chrome.notifications.create({
        type: "basic", 
        iconUrl:"img/ws-logo-bw.png", 
        title:"hello", 
        message: "lorem ipsum"
    });
    
});