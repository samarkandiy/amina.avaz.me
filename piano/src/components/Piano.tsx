import React, { useCallback, useState } from 'react';
import { NOTES } from '../utils/noteUtils';
import { useAudioEngine } from '../hooks/useAudioEngine';
import PianoKey from './PianoKey';
import PianoControls from './PianoControls';
import KeyboardGuide from './KeyboardGuide';
import useKeyboardInput from '../hooks/useKeyboardInput';

const Piano: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showKeyboard, setShowKeyboard] = useState(true);
  
  const effectiveVolume = isMuted ? 0 : volume;
  const { playNote, isInitialized, error } = useAudioEngine(effectiveVolume);
  const activeNotes = useKeyboardInput(playNote);

  const handleNotePress = useCallback((note: string) => {
    if (isInitialized) {
      playNote(note);
    }
  }, [isInitialized, playNote]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-purple-600 mb-2">Loading piano sounds...</p>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Virtual Grand Piano</h1>
          <p className="text-purple-600">Play with your computer keyboard or click the keys!</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <PianoControls
            volume={volume}
            isMuted={isMuted}
            showKeyboard={showKeyboard}
            onVolumeChange={setVolume}
            onMuteToggle={() => setIsMuted(!isMuted)}
            onKeyboardToggle={() => setShowKeyboard(!showKeyboard)}
          />

          <div className="relative flex justify-center overflow-x-auto pb-4">
            <div className="flex">
              {NOTES.map((note) => (
                <PianoKey
                  key={note.note}
                  note={note.note}
                  isBlack={note.isBlack}
                  isActive={activeNotes.has(note.note)}
                  keyLabel={note.key}
                  showKeyboard={showKeyboard}
                  onPress={() => handleNotePress(note.note)}
                  onRelease={() => {}}
                />
              ))}
            </div>
          </div>
        </div>

        {showKeyboard && <KeyboardGuide />}
      </div>
    </div>
  );
};

export default Piano;