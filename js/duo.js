viet_to_eng_dict = {"xin chào" : "hello", 
                    "cảm ơn" : "thank you", 
                    "tạm biệt" : "goodbye", 
                    "xin lỗi" : "sorry", 
                    "bạn" : "friend", 
                    "bầu cử" : "vote"}


var synthesis = window.speechSynthesis;
var lang = 'vi-VN'
var utterance = new SpeechSynthesisUtterance();

var currIdx = 0

function sayIt(){
    var voices = synthesis.getVoices();

    if ('speechSynthesis' in window) {
        utterance.voice = voices.filter(voice => voice.lang == lang)[0]
        console.log(utterance.voice)
        utterance.lang = lang
        utterance.text = viet_to_eng_dict.items(currIdx)[0]
        synthesis.speak(utterance);
    } else {
        console.log('Text-to-speech not supported.');
    }
};


// Speech recognition

if ("webkitSpeechRecognition" in window) {
    // (We'll do speech recognition here!)

    var speechRecognition = new webkitSpeechRecognition();

    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";
ƒ
    // When we click the start button, start recognizing 
    document.querySelector("#start-button").onclick = () => {
        speechRecognition.start();
    };

    // When we click the stop button, stop recognizing 
    document.querySelector("#stop-button").onclick = () => {
        speechRecognition.stop();
    };

    let spokenWords = "";

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
