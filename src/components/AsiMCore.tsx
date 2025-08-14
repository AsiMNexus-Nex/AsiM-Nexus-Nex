import React, { useState, useEffect } from 'react';
import { CommandInterface } from './CommandInterface';
import { FeatureGrid } from './FeatureGrid';
import { TaskQueue } from './TaskQueue';
import { DataManager } from './DataManager';
import { useAsiMCore } from '../hooks/useAsiMCore';

export const AsiMCore: React.FC = () => {
  const { 
    isActive, 
    currentLanguage, 
    tasks, 
    executeCommand, 
    addTask, 
    setLanguage 
  } = useAsiMCore();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="glass rounded-xl p-6 text-center neon-glow">
        <h2 className="text-2xl font-bold text-white mb-2">
          {currentLanguage === 'ne' ? 'स्वागतम्!' : 
           currentLanguage === 'hi' ? 'स्वागत है!' : 'Welcome!'}
        </h2>
        <p className="text-blue-300">
          {currentLanguage === 'ne' ? 
            'म AsiM Nexus Mini AI हुँ। तपाईंका सबै कमाण्डहरू तुरुन्तै कार्यान्वयन गर्न तयार छु।' :
            currentLanguage === 'hi' ?
            'मैं AsiM Nexus Mini AI हूँ। आपके सभी कमांड तुरंत execute करने के लिए तैयार हूँ।' :
            'I am AsiM Nexus Mini AI. Ready to execute all your commands instantly.'
          }
        </p>
      </div>

      {/* Command Interface */}
      <CommandInterface 
        onCommand={executeCommand}
        language={currentLanguage}
        onLanguageChange={setLanguage}
      />

      {/* Feature Grid */}
      <FeatureGrid language={currentLanguage} onFeatureSelect={addTask} />

      {/* Task Queue & Data Manager */}
      <div className="grid md:grid-cols-2 gap-6">
        <TaskQueue tasks={tasks} language={currentLanguage} />
        <DataManager language={currentLanguage} />
      </div>
    </div>
  );
};