let index = 0;
let textTocopy = "";
let targetWPM;
let charsPersecond;
let millisecondsPerChar;

// Text that needs to be copied is under class inputPanel.
// they do no appear on page load. The modifier is set to run on an interval until it does appear and is changed. 
//get wpm value from storage
chrome.storage.sync.get(['wpm'], function (result) {
    targetWPM = result.wpm;
    //if wpm is not set, set it to 100
    if (targetWPM === undefined) {
        chrome.storage.sync.set({ wpm: 100 }, function () {
            console.log("WPM is set to " + 100);
        })
    }
    //calculate the number of characters per second
    charsPerSecond = (targetWPM * 5) / 60;
    inverseCharsPerSecond = 1 / charsPerSecond;
    millisecondsPerChar = inverseCharsPerSecond * 1000;

    setInterval(() => {
        if (document.querySelector('.inputPanel') && !textTocopy) {
            //get the text to be copied
            textToCopy = document.querySelector('.inputPanel').innerText;

            //get child nodes of the input field
            let textToInput = document.querySelector('.inputPanel').childNodes[0].childNodes[1].childNodes[0].childNodes[0];

            //if textToInput has disabled attribute it is not ready to be typed in.
            if (textToInput.hasAttribute('disabled') && textToCopy) {
                //mark the text to be copied as yellow to notify user successful copy but not ready to be written       
                document.querySelector('.inputPanel').style.color = 'yellow';
            } else if (!textToInput.hasAttribute('disabled') && textToCopy) {
                if (document.querySelector('.inputPanel').style.color !== 'green') {
                    //mark green to notify user ready to be written
                    document.querySelector('.inputPanel').style.color = 'green';
                }
                //keep the input field in focus
                document.querySelector('.inputPanel').childNodes[0].childNodes[1].childNodes[0].childNodes[0].focus()
                //set the value of the input field to the text to be copied
                document.querySelector('.inputPanel').childNodes[0].childNodes[1].childNodes[0].childNodes[0].value = textToInput.value.concat(textToCopy[index]);
                index = index + 1;
                //typeracer listens for a keydown event to enter the current word. This event is simulated here.
                var event = new KeyboardEvent('keydown', {
                    key: ' ',
                    keyCode: 32,
                    which: 32,
                    code: 'Space'
                });
                document.querySelector('.inputPanel').childNodes[0].childNodes[1].childNodes[0].childNodes[0].dispatchEvent(event);
            }

        }

        try {
            //if the text to be copied is finished, the game is over. Reset the variables.
            //the actual text to that needs to be entered is 21 characters from the end of the string that is copied
            if (index === textToCopy.length - 21) {
                console.log("reset")
                textToCopy = "";
                index = 0;
                textToInput.value = "";
            }
        } catch (error) {
            console.log(error)
        }
    }, millisecondsPerChar);
});


