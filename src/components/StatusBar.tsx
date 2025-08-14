import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Clock, Cpu } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(Math.random() * 30 + 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setCpuUsage(Math.random() * 30 + 10);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="glass border-t border-white/10 p-2">
      <div className="container mx-auto flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Cpu className="w-3 h-3" />
            <span>{cpuUsage.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-3 h-3 text-green-400" />
            <span>Online</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery className="w-3 h-3 text-green-400" />
            <span>Ready</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{time.toLocaleTimeString()}</span>
        </div>
      </div>
    </footer>
  );
};