import { Note } from './noteTypes';

// Lower section keys (C2-B3)
const LOWER_KEYS: Note[] = [
  { note: 'C2', key: '1', frequency: 65.41 },
  { note: 'C#2', key: '!', frequency: 69.30, isBlack: true },
  { note: 'D2', key: '2', frequency: 73.42 },
  { note: 'D#2', key: '@', frequency: 77.78, isBlack: true },
  { note: 'E2', key: '3', frequency: 82.41 },
  { note: 'F2', key: '4', frequency: 87.31 },
  { note: 'F#2', key: '$', frequency: 92.50, isBlack: true },
  { note: 'G2', key: '5', frequency: 98.00 },
  { note: 'G#2', key: '%', frequency: 103.83, isBlack: true },
  { note: 'A2', key: '6', frequency: 110.00 },
  { note: 'A#2', key: '^', frequency: 116.54, isBlack: true },
  { note: 'B2', key: '7', frequency: 123.47 },
  
  { note: 'C3', key: '8', frequency: 130.81 },
  { note: 'C#3', key: '*', frequency: 138.59, isBlack: true },
  { note: 'D3', key: '9', frequency: 146.83 },
  { note: 'D#3', key: '(', frequency: 155.56, isBlack: true },
  { note: 'E3', key: '0', frequency: 164.81 },
  { note: 'F3', key: '-', frequency: 174.61 },
  { note: 'F#3', key: '_', frequency: 185.00, isBlack: true },
  { note: 'G3', key: '=', frequency: 196.00 },
  { note: 'G#3', key: '+', frequency: 207.65, isBlack: true },
  { note: 'A3', key: '[', frequency: 220.00 },
  { note: 'A#3', key: '{', frequency: 233.08, isBlack: true },
  { note: 'B3', key: ']', frequency: 246.94 }
];

// Middle section keys (C4-B4)
const MIDDLE_KEYS: Note[] = [
  { note: 'C4', key: 'a', frequency: 261.63 },
  { note: 'C#4', key: 'w', frequency: 277.18, isBlack: true },
  { note: 'D4', key: 's', frequency: 293.66 },
  { note: 'D#4', key: 'e', frequency: 311.13, isBlack: true },
  { note: 'E4', key: 'd', frequency: 329.63 },
  { note: 'F4', key: 'f', frequency: 349.23 },
  { note: 'F#4', key: 't', frequency: 369.99, isBlack: true },
  { note: 'G4', key: 'g', frequency: 392.00 },
  { note: 'G#4', key: 'y', frequency: 415.30, isBlack: true },
  { note: 'A4', key: 'h', frequency: 440.00 },
  { note: 'A#4', key: 'u', frequency: 466.16, isBlack: true },
  { note: 'B4', key: 'j', frequency: 493.88 }
];

// Upper section keys (C5-C6)
const UPPER_KEYS: Note[] = [
  { note: 'C5', key: 'k', frequency: 523.25 },
  { note: 'C#5', key: 'o', frequency: 554.37, isBlack: true },
  { note: 'D5', key: 'l', frequency: 587.33 },
  { note: 'D#5', key: 'p', frequency: 622.25, isBlack: true },
  { note: 'E5', key: ';', frequency: 659.25 },
  { note: 'F5', key: "'", frequency: 698.46 },
  { note: 'F#5', key: '[', frequency: 739.99, isBlack: true },
  { note: 'G5', key: '\\', frequency: 783.99 },
  { note: 'G#5', key: ']', frequency: 830.61, isBlack: true },
  { note: 'A5', key: 'z', frequency: 880.00 },
  { note: 'A#5', key: 'x', frequency: 932.33, isBlack: true },
  { note: 'B5', key: 'c', frequency: 987.77 },
  { note: 'C6', key: 'v', frequency: 1046.50 }
];

export const ALL_NOTES = [...LOWER_KEYS, ...MIDDLE_KEYS, ...UPPER_KEYS];