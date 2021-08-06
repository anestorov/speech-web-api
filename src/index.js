var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

var textarea = document.querySelector('#textarea');
var mic = document.querySelector('#mic');

var elements = {
    firstName : {elm:document.querySelector('#firstName'), text:"first name"},
    lastName : {elm:document.querySelector('#lastName'), text:"last name"},
    email : {elm:document.querySelector('#email'), text:"email"},
    password : {elm:document.querySelector('#password'), text:"password"},
    address : {elm:document.querySelector('#address'), text:"address"},
    city : {elm:document.querySelector('#city'), text:"city"},
    state : {elm:document.querySelector('#state'), text:"state"},
    zip : {elm:document.querySelector('#zip'), text:"zip"},
}
var pointer = null
var grammar = '#JSGF V1.0; grammar terms; public <term> = next|' + Object.values(elements).map(v=>v.text).join('|') + ';'
console.log(grammar);

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function (event) {
    var transcript = "";
    console.log(event.results);
    //textarea.value = "";

    for(const v of event.results) {
        //textarea.value += v[0].transcript+"\r\n";
        transcript = v[0].transcript.trim().toLowerCase();
    }

    console.log(transcript);
    let found = false;
    Object.values(elements).forEach(v=>{
        if(transcript == v.text) {
            pointer = v;
            pointer?.elm?.focus();
            found = true;
        }
    });

    console.log(pointer);

    //if(transcript == 'next') 

    if(!found && pointer) pointer.elm.value = transcript;
}

recognition.onspeechend = function () {
    recognition.stop();
    micOFF();
}

recognition.onnomatch = function (event) {
    console.warn(event);
}

recognition.onerror = function (event) {
    console.warn(event);
}

recognition.onaudioend = function (event) {
    console.warn(event);
    micOFF();
}

recognition.onend = function (event) {
    console.warn(event);
    micOFF();
}
recognition.onsoundend = function (event) {
    console.warn(event);
    micOFF();
}

mic.addEventListener('click',()=>{
    recognition.start();
    micON();
});

function micOFF() {
    mic.value = "Mic OFF"
    mic.classList.add('btn-outline-danger');
    mic.classList.remove('btn-outline-primary');
}
function micON() {
    mic.value = "Mic ON"
    mic.classList.remove('btn-outline-danger');
    mic.classList.add('btn-outline-primary');
}
    
