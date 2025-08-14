import React from 'react';
import { Brain, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="glass border-b border-white/10 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="w-8 h-8 text-blue-400 animate-pulse-slow" />
            <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AsiM Nexus Mini AI</h1>
            <p className="text-xs text-blue-300">Ultra-lightweight AI System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
            ● Active
          </span>
          <span className="text-gray-400">v1.0.0</span>
        </div>
      </div>
    </header>
  );
};