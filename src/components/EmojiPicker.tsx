
import React, { useState } from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const countryEmojis = [
    '🌎', '🌍', '🌏', '🇧🇷', '🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇨🇦', '🇯🇵', 
    '🇮🇹', '🇪🇸', '🇵🇹', '🇦🇺', '🇲🇽', '🇨🇳', '🇮🇳', '🇷🇺', '🇦🇷', '🇨🇭',
    '🇸🇪', '🇳🇴', '🇩🇰', '🇫🇮', '🇳🇿', '🇿🇦', '🇰🇷', '🇸🇬', '🇦🇪', '🇪🇬',
    '🇹🇷', '🇬🇷', '🇮🇪', '🇳🇱', '🇧🇪', '🇦🇹', '🇵🇱', '🇭🇺', '🇨🇿', '🇹🇭'
  ];

  return (
    <div className="p-3 border rounded-lg bg-white">
      <p className="text-sm text-gray-500 mb-2">Escolha um ícone:</p>
      <div className="grid grid-cols-8 gap-2">
        {countryEmojis.map((emoji) => (
          <div 
            key={emoji} 
            className="flex items-center justify-center p-2 rounded hover:bg-gray-100 cursor-pointer text-lg"
            onClick={() => onSelect(emoji)}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
