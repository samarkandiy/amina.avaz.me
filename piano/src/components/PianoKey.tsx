import React from 'react';
import NoteLabel from './NoteLabel';

interface PianoKeyProps {
  note: string;
  isBlack?: boolean;
  isActive: boolean;
  keyLabel: string;
  showKeyboard: boolean;
  onPress: () => void;
  onRelease: () => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  isBlack = false,
  isActive,
  keyLabel,
  showKeyboard,
  onPress,
  onRelease
}) => {
  return (
    <div
      className={`
        relative select-none cursor-pointer transition-all duration-100
        ${isBlack 
          ? 'bg-gray-800 text-white h-32 w-10 -mx-5 z-10' 
          : 'bg-white border border-gray-200 h-48 w-14'}
        ${isActive 
          ? (isBlack 
              ? 'bg-purple-700 shadow-inner scale-[0.98]' 
              : 'bg-purple-100 shadow-inner scale-[0.98]')
          : ''}
        rounded-b-lg
        ${isBlack 
          ? 'hover:bg-purple-700' 
          : 'hover:bg-purple-50'}
      `}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={(e) => {
        e.preventDefault();
        onPress();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onRelease();
      }}
    >
      <NoteLabel
        note={note}
        keyLabel={keyLabel}
        showKeyboard={showKeyboard}
        isBlack={isBlack}
      />
    </div>
  );
};

export default PianoKey;