let changed;
var i = -3;
let value = "";

// Text that needs to be copied has a unselectable property.
// they do no appear on page load. The modifier is set to run on an interval until it does appear and is changed. 
setInterval(() => {
    if (document.querySelector('.unselectable') && changed !== 10) {
        document.querySelector('.unselectable').style.userSelect = 'all';
        document.querySelector('.unselectable').style.color = 'red'
        changed = 10;
    }
}, 1000);

// Listens to a key pres, if it is a "/", perform the script. the first 3 if statements are providing a
// visual Queue for the user. The background script determines which number should be displayed next and returns and appends
//the inout field instead of the "/" key
document.onkeydown = (function (event) {

    if (event.key === "/") {

        i = i + 1;

        if (i == -2) {
            document.querySelector('.unselectable').style.color = 'yellow';
        } else if (i === -1) {
            document.querySelector('.unselectable').style.color = 'green';
        } else if (i >= 0) {
            document.querySelector('.unselectable').style.color = 'black';
        }
        chrome.runtime.sendMessage({ text: "hello" }, function (response) {
            console.log(response)
            value = response;


        })

        // prevent the "/" key from being typed in the input field
        event.preventDefault();
        //apend the input field
        document.activeElement.value = document.activeElement.value + value;

    }

});



