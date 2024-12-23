import Soundfont from 'soundfont-player';

export function initializeAudioContext(): AudioContext {
  return new AudioContext();
}

export async function initializeInstrument(audioContext: AudioContext, volume: number) {
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }

  const adjustedVolume = Math.min(volume * 4, 2);
  return await Soundfont.instrument(audioContext, 'acoustic_grand_piano', {
    soundfont: 'MusyngKite',
    gain: adjustedVolume
  });
}