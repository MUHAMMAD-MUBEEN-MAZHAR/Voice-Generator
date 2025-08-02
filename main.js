let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        // Retry after slight delay if voices aren't loaded yet
        setTimeout(populateVoices, 100);
        return;
    }

    voiceSelect.innerHTML = ""; // Clear old options
    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    speech.voice = voices[0]; // Default voice
}

// Trigger voices load
populateVoices();

// Some browsers fire voiceschanged
window.speechSynthesis.onvoiceschanged = populateVoices;

// Change voice on selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Button click to speak
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
