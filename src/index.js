var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

var textarea = document.querySelector('#textarea');
var mic = document.querySelector('#mic');

var elements = [
    { elm: document.querySelector('#firstName'), text: "first name" },
    { elm: document.querySelector('#lastName'), text: "last name" },
    { elm: document.querySelector('#email'), text: "email" },
    { elm: document.querySelector('#password'), text: "password" },
    { elm: document.querySelector('#address'), text: "address" },
    { elm: document.querySelector('#city'), text: "city" },
    { elm: document.querySelector('#state'), text: "state" },
    { elm: document.querySelector('#zip'), text: "zip" },
];
var pointer = null
var grammar = '#JSGF V1.0; grammar terms; public <term> = previous|next|clear|' + elements.map(v => v.text).join('|') + ';'
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

    for (const v of event.results) {
        //textarea.value += v[0].transcript+"\r\n";
        transcript = v[0].transcript.trim().toLowerCase();
    }

    console.log(transcript);

    let found = false;
    elements.forEach((v,k) => {
        if (transcript == v.text) {
            pointer = k;
            elements[pointer]?.elm?.focus();
            found = true;
        }
    });

    if(transcript == 'next') {
        found = true;
        pointer++;
        elements[pointer]?.elm?.focus();
    }
    if(transcript == 'previous') {
        found = true;
        pointer--;
        elements[pointer]?.elm?.focus();
    }
    if(transcript == 'clear') {
        transcript = "";
    }

    if (!found && elements[pointer]) elements[pointer].elm.value = transcript;
}

recognition.onspeechend = function (event) {
    console.warn(event);
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

var appState = false;

mic.addEventListener('click', () => {
    if (appState) {
        recognition.stop();
        micOFF();
    } else {
        recognition.start();
        micON();
    }
});


function micOFF() {
    mic.classList.add('btn-outline-danger');
    mic.classList.remove('btn-outline-primary');
    appState = false;
}
function micON() {
    mic.classList.remove('btn-outline-danger');
    mic.classList.add('btn-outline-primary');
    appState = true;
}

