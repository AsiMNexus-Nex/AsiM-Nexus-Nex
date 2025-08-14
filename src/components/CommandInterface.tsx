import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send, Globe } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface CommandInterfaceProps {
  onCommand: (command: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const CommandInterface: React.FC<CommandInterfaceProps> = ({
  onCommand,
  language,
  onLanguageChange
}) => {
  const [command, setCommand] = useState('');
  const { isListening, startListening, stopListening } = useSpeechRecognition(setCommand);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onCommand(command);
      setCommand('');
    }
  };

  const languages = [
    { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {language === 'ne' ? 'कमाण्ड इन्टरफेस' : 
           language === 'hi' ? 'कमांड इंटरफेस' : 'Command Interface'}
        </h3>
        
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <select 
            value={language} 
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-slate-800 text-white text-sm rounded px-2 py-1 border border-gray-600"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder={
              language === 'ne' ? 'तपाईंको कमाण्ड टाइप गर्नुहोस् वा बोल्नुहोस्...' :
              language === 'hi' ? 'अपना कमांड टाइप करें या बोलें...' :
              'Type or speak your command...'
            }
            className="w-full bg-slate-800/50 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-20 border border-gray-600 focus:border-blue-400 focus:outline-none"
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            
            <button
              type="submit"
              disabled={!command.trim()}
              className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};