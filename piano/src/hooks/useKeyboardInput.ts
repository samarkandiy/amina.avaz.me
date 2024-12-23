import { useState, useEffect, useCallback } from 'react';
import { NOTES } from '../utils/noteUtils';

export default function useKeyboardInput(playNote: (note: string) => void) {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent default behavior for piano keys to avoid scrolling
    if (NOTES.some(n => n.key === event.key)) {
      event.preventDefault();
    }

    const note = NOTES.find(n => n.key === event.key);
    if (note && !activeNotes.has(note.note)) {
      setActiveNotes(prev => new Set(prev).add(note.note));
      playNote(note.note);
    }
  }, [playNote, activeNotes]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const note = NOTES.find(n => n.key === event.key);
    if (note) {
      setActiveNotes(prev => {
        const next = new Set(prev);
        next.delete(note.note);
        return next;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return activeNotes;
}