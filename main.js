let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to load & filter voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
        // Retry if voices not loaded yet (common in mobile)
        setTimeout(populateVoices, 100);
        return;
    }

    //  FILTER: Show only English voices (you can customize this filter)
    voices = voices.filter(voice => voice.lang.startsWith('en'));

    voiceSelect.innerHTML = ""; // Clear dropdown first

    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    // Set default voice
    speech.voice = voices[0];

    // Debug log (optional): Check voices on mobile
    console.log("Available voices:", voices);
}

// Load voices initially
populateVoices();

// Also reload if browser supports voiceschanged event
window.speechSynthesis.onvoiceschanged = populateVoices;

// Change voice on selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Speak the entered text
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
