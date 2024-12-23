import React from 'react';

const KeyboardGuide: React.FC = () => {
  return (
    <div className="text-center text-purple-600 text-sm bg-white p-4 rounded-lg shadow-md">
      <p className="font-semibold mb-2">Keyboard Layout:</p>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="font-semibold text-purple-700">Lower Octaves (C2-B3):</p>
          <p className="font-mono">
            White keys: 1 2 3 4 5 6 7 8 9 0 - = [ ]
          </p>
          <p className="font-mono">
            Black keys: ! @ $ % ^ * ( _ + {'{'}
          </p>
        </div>
        <div>
          <p className="font-semibold text-purple-700">Middle Octave (C4-B4):</p>
          <p className="font-mono">
            White keys: A S D F G H J
          </p>
          <p className="font-mono">
            Black keys: W E T Y U
          </p>
        </div>
        <div>
          <p className="font-semibold text-purple-700">Upper Octaves (C5-C6):</p>
          <p className="font-mono">
            White keys: K L ; ' \ Z C V
          </p>
          <p className="font-mono">
            Black keys: O P [ ] X
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardGuide;