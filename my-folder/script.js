// Function to change pitch
function changePitch(audioBuffer, pitchFactor) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    // Create a pitch shifter
    const pitchShifter = audioCtx.createPitchShifter();
    pitchShifter.pitch = pitchFactor;

    // Connect the audio nodes
    source.connect(pitchShifter);
    pitchShifter.connect(audioCtx.destination);

    // Start playing
    source.start();
}

// Load the audio file
function loadAudioFile(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            return new Promise((resolve, reject) => {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                audioCtx.decodeAudioData(arrayBuffer, resolve, reject);
            });
        });
}

// Main function
async function main() {
    // Load the audio file from the provided link
    const audioBuffer = await loadAudioFile('https://www.myinstants.com/media/sounds/y2mate_Ajp9shj.mp3');

    // Define pitch levels
    const pitchLevels = [1.0, 1.3, 1.6, 2.0]; // Normal to highest

    // Event listener for Enter key press
    document.addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            // Play the audio at different pitch levels
            pitchLevels.forEach(pitch => {
                changePitch(audioBuffer, pitch);
            });
        }
    });
}

// Call the main function
main();
