import { useState, useEffect, useCallback } from 'react';
import { initializeAudioContext, initializeInstrument } from '../utils/audioInitializer';

export function useAudioEngine(volume: number) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [instrument, setInstrument] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize audio context
  useEffect(() => {
    const ctx = initializeAudioContext();
    setAudioContext(ctx);
  }, []);

  // Initialize instrument
  useEffect(() => {
    if (!audioContext) return;

    const setup = async () => {
      try {
        const piano = await initializeInstrument(audioContext, volume);
        setInstrument(piano);
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize instrument:', err);
        setError('Failed to load piano sounds. Please try clicking anywhere on the page.');
        setIsInitialized(false);
      }
    };

    setup();
  }, [audioContext, volume]);

  const playNote = useCallback(async (note: string) => {
    if (!instrument || !audioContext) return;

    try {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      instrument.play(note);
    } catch (error) {
      console.error('Failed to play note:', error);
    }
  }, [instrument, audioContext]);

  return { playNote, isInitialized, error };
}