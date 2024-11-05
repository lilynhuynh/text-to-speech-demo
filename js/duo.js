viet_to_eng_dict = {
                    0 : {
                        viet: "xin chào",
                        eng: "hello"
                    },
                    1 : {
                        viet: "cảm ơn",
                        eng : "thank you"
                    },
                    2 : {
                        viet: "tạm biệt",
                        eng:  "goodbye"
                    },
                    3 : {
                        viet: "xin lỗi",
                        eng: "sorry"
                    },
                    4 : {
                        viet: "bạn",
                        eng: "friend"
                    },
                    5: {
                        viet: "bầu cử",
                        eng: "vote"
                    }
                }

var synthesis = window.speechSynthesis;
var lang = 'vi-VN'
var utterance = new SpeechSynthesisUtterance("");

var currIdx = 0

function sayIt(){
    var voices = synthesis.getVoices();
    document.querySelector("#heard").innerHTML = "";

    if (currIdx >= Object.keys(viet_to_eng_dict).length) {
        complete()
    } else {
        if ('speechSynthesis' in window) {
            utterance.voice = voices.filter(voice => voice.lang == lang)[0]
            console.log(utterance.voice)
            utterance.lang = lang
            currentText = viet_to_eng_dict[currIdx].viet
            console.log(currentText)
            utterance.text = currentText
            synthesis.speak(utterance);
        } else {
            console.log('Text-to-speech not supported.');
        }
    }
};

// Speech recognition
if ("webkitSpeechRecognition" in window) {
    // (We'll do speech recognition here!)
    var speechRecognition = new webkitSpeechRecognition();

    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";
    // When we click the start button, start recognizing

    let spokenWords = "";

    document.querySelector("#start-button").onclick = () => {
        spokenWords = "";
        speechRecognition.start();
    };

    // When we click the stop button, stop recognizing 
    document.querySelector("#stop-button").onclick = () => {
        speechRecognition.stop();

        var finalText = document.querySelector("#heard").innerHTML
        if (finalText.toLowerCase() == viet_to_eng_dict[currIdx].eng) {
            console.log("Correct!")
            correctAlert()
            currIdx += 1
            updateScore()

            if (currIdx >= Object.keys(viet_to_eng_dict).length) {
                complete()
            }
        } else {
            console.log("Incorrect!")
            incorrectAlert()
        }
    };

    spokenWords = "";
    speechRecognition.onresult = (event) => {
        let wordsInProgress = "";
        // Loop through the results from the speechRecognition event.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            // If the result item is "finalized", put it in the spokenWords transcript.
            if (event.results[i].isFinal) {
                spokenWords += event.results[i][0].transcript;
                // ...otherwise, it's part of the "in-progress" transcript.
            } else {
                wordsInProgress += event.results[i][0].transcript;
            }
        }

        // Update the text we can see on the HTML page.
        document.querySelector("#heard").innerHTML = spokenWords;
        document.querySelector("#heardInProgress").innerHTML = wordsInProgress;
    };
} else {
    console.log("Speech recognition not supported.");
}

function updateScore() {
    var total = Object.keys(viet_to_eng_dict).length
    var score = ((currIdx)/total)*100

    var progress = document.querySelector("#curScore")
    progress.style.width = score + "%"

    var scoreVal = document.querySelector("#score") 
    scoreVal.innerHTML = currIdx
}

function incorrectAlert() {
    var alert = document.querySelector("#alertIcon")
    alert.className = "alert alert-warning"
    alert.innerHTML = "Incorrect! Please try again."
}

function correctAlert() {
    var alert = document.querySelector("#alertIcon")
    alert.className = "alert alert-success"
    alert.innerHTML = "Well done!"
}

function complete() {
    var alertCompletion = document.querySelector(".complete")

    alertCompletion.innerHTML = `
        <div class="alert alert-block alert-success">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h4>Congratulations, you have passed the test!</h4>
        If you would like to replay the game, please refresh the page!
        </div>
        `
}