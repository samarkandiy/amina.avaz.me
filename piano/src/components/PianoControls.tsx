import React from 'react';
import { Volume2, VolumeX, Keyboard } from 'lucide-react';

interface PianoControlsProps {
  volume: number;
  isMuted: boolean;
  showKeyboard: boolean;
  onVolumeChange: (value: number) => void;
  onMuteToggle: () => void;
  onKeyboardToggle: () => void;
}

const PianoControls: React.FC<PianoControlsProps> = ({
  volume,
  isMuted,
  showKeyboard,
  onVolumeChange,
  onMuteToggle,
  onKeyboardToggle,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMuteToggle}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="text-red-500" /> : <Volume2 className="text-purple-500" />}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-32 accent-purple-500"
        />
      </div>

      <button
        onClick={onKeyboardToggle}
        className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
        title="Toggle keyboard layout"
      >
        <Keyboard className={showKeyboard ? "text-purple-500" : "text-gray-400"} size={20} />
      </button>
    </div>
  );
};

export default PianoControls;