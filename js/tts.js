var synthesis = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance("Hello, world!");

var currentVoice = 0

function sayIt(){
    var voices = synthesis.getVoices();

    if ('speechSynthesis' in window) {
        utterance.voice = voices[126]
        console.log(voices[126])
        utterance.pitch = 1.5;
        utterance.rate = 1.3;
        utterance.volume = 1.2;
        synthesis.speak(utterance);
        // currentVoice += 1
    } else {
        console.log('Text-to-speech not supported.');
    }
};

function logVoices() {
    var voices = synthesis.getVoices();

    voices.forEach(function (voice){
        console.log({
            idx: currentVoice,
            name: voice.name,
            lang: voice.lang
        });
        currentVoice += 1
    });
}

utterance.text = "早上好中国，我很喜欢冰淇淋";