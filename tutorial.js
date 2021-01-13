
// var TWINKLE_TWINKLE, ORIGINAL_TWINKLE_TWINKLE, DRUMS, LITTLE_TEAPOT;
// var player, visualizer, viz, vizPLayer;
// var music_rnn, rnnPlayer, music_vae, vaePlayer;

// function startOrStop(event, p, seq = TWINKLE_TWINKLE) {
//     if (p.isPlaying()) {
//         p.stop();
//         event.target.textContent = 'Play';
//     } else {
//         p.start(seq).then(() => {
//             // Stop all buttons.
//             const btns = document.querySelectorAll('.controls > button');
//             for (let btn of btns) {
//                 btn.textContent = 'Play';
//             }
//         });
//         event.target.textContent = 'Stop';
//     }
// }

function play() {
    TWINKLE_TWINKLE = {
        notes: [
            { pitch: 60, startTime: 0.0, endTime: 0.5 },
            { pitch: 60, startTime: 0.5, endTime: 1.0 },
            { pitch: 67, startTime: 1.0, endTime: 1.5 },
            { pitch: 67, startTime: 1.5, endTime: 2.0 },
            { pitch: 69, startTime: 2.0, endTime: 2.5 },
            { pitch: 69, startTime: 2.5, endTime: 3.0 },
            { pitch: 67, startTime: 3.0, endTime: 4.0 },
            { pitch: 65, startTime: 4.0, endTime: 4.5 },
            { pitch: 65, startTime: 4.5, endTime: 5.0 },
            { pitch: 64, startTime: 5.0, endTime: 5.5 },
            { pitch: 64, startTime: 5.5, endTime: 6.0 },
            { pitch: 62, startTime: 6.0, endTime: 6.5 },
            { pitch: 62, startTime: 6.5, endTime: 7.0 },
            { pitch: 60, startTime: 7.0, endTime: 8.0 },
        ],
        tempos: [{
            time: 0,
            qpm: 120
        }],
        totalTime: 8
    };

    DRUMS = {
        notes: [
            { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
            { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
            { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
            { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
            { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
            { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
            { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
            { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
            { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
            { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
            { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
            { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
            { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
            { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
            { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
            { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
            { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
            { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        ],
        quantizationInfo: { stepsPerQuarter: 4 },
        tempos: [{ time: 0, qpm: 120 }],
        totalQuantizedSteps: 11
    };

    // player = new mm.Player();
    player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');

    // Players can also play at a different tempo
    player.setTempo(60);

    player.start(TWINKLE_TWINKLE);
    // player.stop();

}

function rnnModel() {

    TWINKLE_TWINKLE = {
        notes: [
            { pitch: 60, startTime: 0.0, endTime: 0.5 },
            { pitch: 60, startTime: 0.5, endTime: 1.0 },
            { pitch: 67, startTime: 1.0, endTime: 1.5 },
            { pitch: 67, startTime: 1.5, endTime: 2.0 },
            { pitch: 69, startTime: 2.0, endTime: 2.5 },
            { pitch: 69, startTime: 2.5, endTime: 3.0 },
            { pitch: 67, startTime: 3.0, endTime: 4.0 },
            // { pitch: 65, startTime: 4.0, endTime: 4.5 },
            // { pitch: 65, startTime: 4.5, endTime: 5.0 },
            // { pitch: 64, startTime: 5.0, endTime: 5.5 },
            // { pitch: 64, startTime: 5.5, endTime: 6.0 },
            // { pitch: 62, startTime: 6.0, endTime: 6.5 },
            // { pitch: 62, startTime: 6.5, endTime: 7.0 },
            // { pitch: 60, startTime: 7.0, endTime: 8.0 },
        ],
        tempos: [{
            time: 0,
            qpm: 60
        }],
        totalTime: 8
    };

    var rnn_steps = 250;
    var rnn_temperature = 1.5;

    music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    music_rnn.initialize();

    player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
    player.setTempo(60);

    const qns = mm.sequences.quantizeNoteSequence(ORIGINAL_TWINKLE_TWINKLE, 4);
    music_rnn
        .continueSequence(qns, rnn_steps, rnn_temperature)
        .then((sample) => player.start(sample));

}