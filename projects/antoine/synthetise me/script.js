console.clear();

// UPDATE: there is a problem in chrome with starting audio context
//  before a user gesture. This fixes it.
document.documentElement.addEventListener('mousedown', () => {
  if (Tone.context.state !== 'running') Tone.context.resume();
});


const synths = [
new Tone.Synth(),
new Tone.Synth(),
new Tone.Synth(),
new Tone.Synth(),
new Tone.Synth()];


synths[0].oscillator.type = 'triangle';
synths[1].oscillator.type = 'sine';
synths[2].oscillator.type = 'sine2';
synths[3].oscillator.type = 'sine3';
synths[4].oscillator.type = 'triangle2';
//const reverb = new Tone.JCReverb(0.4).toDestination();
const gain = new Tone.Gain(0.1);
gain.toMaster();

synths.forEach(synth => synth.connect(gain));
 
const $rows = document.body.querySelectorAll('div > div'),
notes = ['G3', 'E3', 'C3', 'A3','E2'];
// console.log( $rows);
let index = 0;

Tone.Transport.scheduleRepeat(repeat, '8n');
Tone.Transport.start();

function repeat(time) {
  let step = index % 16;
  for (let i = 0; i < $rows.length; i++) {
    let synth = synths[i],
    note = notes[i],
    $row = $rows[i],
    $input = $row.querySelector(`input:nth-child(${step + 1})`);
   
    if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
  }
  index++;
}