chrome.runtime.onMessage.addListener((msg) => {
    // TODO sending html to API
    console.log(msg);
    chrome.notifications.create({
        type: "basic", 
        iconUrl:"ws-logo-bw.png", 
        title:"hello", 
        message: "lorem ipsum"
    });
    
});