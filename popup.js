// Retrieve the stored value from Chrome storage
chrome.storage.sync.get(['wpm'], function (result) {
    var retrievedWPM = result.wpm;

    // Do something with the retrieved value, like displaying it in the popup HTML
    var valueElement = document.getElementById('storedWPMElement');
    if (retrievedWPM !== undefined) {
        valueElement.textContent = 'Target WPM: ' + retrievedWPM;
    } else {
        valueElement.textContent = 'WPM value not found.';
    }
});

function setWPM() {
    //get the value from the input field
    let wpm = document.getElementById("wpmInput").value;
    //store the value in chrome storage
    chrome.storage.sync.set({ wpm: wpm }, function () {
        console.log("WPM is set to " + wpm);
    })
    //update the popup html
    var valueElement = document.getElementById('storedWPMElement');
    valueElement.textContent = 'Target WPM: ' + wpm;

    //reload the page
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
    }
    );

}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("setWPMButton").addEventListener("click", setWPM);
})