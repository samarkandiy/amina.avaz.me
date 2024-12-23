// Advanced piano sound synthesis
export class PianoSound {
  private context: AudioContext;
  private masterGain: GainNode;

  constructor(context: AudioContext) {
    this.context = context;
    this.masterGain = context.createGain();
    this.masterGain.connect(context.destination);
  }

  setVolume(value: number) {
    this.masterGain.gain.value = value;
  }

  play(frequency: number) {
    const now = this.context.currentTime;
    
    // Create nodes
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    
    // Configure oscillator
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, now);
    
    // Configure filter for piano-like sound
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(5000, now);
    filter.Q.setValueAtTime(1, now);
    
    // Configure gain envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    // Start and stop
    oscillator.start(now);
    oscillator.stop(now + 2);
    
    return () => {
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      oscillator.stop(now + 0.1);
    };
  }
}