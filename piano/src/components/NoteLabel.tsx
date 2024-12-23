import React from 'react';

interface NoteLabelProps {
  note: string;
  keyLabel: string;
  showKeyboard: boolean;
  isBlack: boolean;
}

const NoteLabel: React.FC<NoteLabelProps> = ({ note, keyLabel, showKeyboard, isBlack }) => {
  // Split note name and octave (e.g., "C#4" -> ["C#", "4"])
  const [noteName, octave] = note.split(/(\d+)/);

  return (
    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
      ${isBlack ? 'text-white' : 'text-gray-600'}`}>
      <span className="text-xs font-medium">
        {noteName}
        <sub className="text-[0.6rem]">{octave}</sub>
      </span>
      {showKeyboard && (
        <span className="text-[0.6rem] opacity-70">{keyLabel}</span>
      )}
    </div>
  );
};

export default NoteLabel;