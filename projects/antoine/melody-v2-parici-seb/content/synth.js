const SYNTHS = {};

function setupAudio() {
  const gain = new Tone.Gain(0.1);
  gain.toMaster();

  const types = ["triangle", "sine", "sine2", "sine3", "triangle2"];

  for (let i = 0; i < types.length; i++) {
    let synth = new Tone.Synth();
    let type = types[i];
    synth.oscillator.type = type;
    synth.connect(gain);

    SYNTHS[type] = synth;
  }
}

window.addEventListener(
  "click",
  () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
  }, true
);

setupAudio();

function playNote(synthType, note) {
  let synth = SYNTHS[synthType];
  synth.triggerAttackRelease(note, "8n");
}
