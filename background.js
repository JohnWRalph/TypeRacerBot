let inputText;
// chrome.runtime.onInstalled.addListener(() => {



    chrome.tabs.onUpdated.addListener(() => {
        i = -2;

    })



    chrome.runtime.onMessage.addListener(
     

        function (request, sender, sendResponse) {

            chrome.contextMenus.onClicked.addListener(function (info) {

                inputText = info.selectionText

            })


            console.log("request:", inputText)


            i = i + 1;
            sendResponse(inputText[i] );
            setInterval(() => {
                console.log("hi")
            }, 1000);


        }
    )
    // chrome.contextMenus.create({
    //     id: "wikipedia",
    //     title: "Send: \"%s\"",
    //     contexts: ["selection"]
    // })


// });

chrome.contextMenus.onClicked.addListener(function (info) {

    console.log("info", info.selectionText)
    chrome.runtime.sendMessage({ text: info.selectionText }, function (response) {
        sendResponse("response")
    })
      

})




