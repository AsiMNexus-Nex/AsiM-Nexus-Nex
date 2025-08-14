import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface Task {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  timestamp: Date;
}

export const useAsiMCore = () => {
  const [isActive, setIsActive] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useLocalStorage('asim-language', 'ne');
  const [tasks, setTasks] = useState<Task[]>([]);

  const executeCommand = useCallback((command: string) => {
    const taskId = Date.now().toString();
    const newTask: Task = {
      id: taskId,
      name: command,
      status: 'running',
      timestamp: new Date()
    };

    setTasks(prev => [newTask, ...prev.slice(0, 9)]);

    // Simulate command execution
    setTimeout(() => {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: Math.random() > 0.1 ? 'completed' : 'error' }
          : task
      ));
    }, 1000 + Math.random() * 2000);

    // Text-to-speech response
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        currentLanguage === 'ne' ? 'कमाण्ड प्राप्त भयो' :
        currentLanguage === 'hi' ? 'कमांड प्राप्त हुआ' :
        'Command received'
      );
      utterance.lang = currentLanguage === 'ne' ? 'ne-NP' : 
                      currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  }, [currentLanguage]);

  const addTask = useCallback((featureKey: string) => {
    const featureNames = {
      qcore: { ne: 'QCore AI सक्रिय गर्दै', hi: 'QCore AI सक्रिय कर रहे हैं', en: 'Activating QCore AI' },
      voice: { ne: 'आवाज नियन्त्रण सेटअप', hi: 'आवाज नियंत्रण सेटअप', en: 'Voice Control Setup' },
      multilang: { ne: 'भाषा परिवर्तन', hi: 'भाषा परिवर्तन', en: 'Language Switch' },
      automation: { ne: 'स्वचालन सुरु', hi: 'स्वचालन शुरू', en: 'Starting Automation' },
      data: { ne: 'डेटा सिंक', hi: 'डेटा सिंक', en: 'Data Sync' },
      security: { ne: 'सुरक्षा जाँच', hi: 'सुरक्षा जांच', en: 'Security Check' },
      optimization: { ne: 'सिस्टम अनुकूलन', hi: 'सिस्टम अनुकूलन', en: 'System Optimization' },
      mobile: { ne: 'मोबाइल मोड', hi: 'मोबाइल मोड', en: 'Mobile Mode' }
    };

    const taskName = featureNames[featureKey as keyof typeof featureNames]?.[currentLanguage as keyof typeof featureNames.qcore] || featureKey;
    executeCommand(taskName);
  }, [executeCommand, currentLanguage]);

  const setLanguage = useCallback((lang: string) => {
    setCurrentLanguage(lang);
  }, [setCurrentLanguage]);

  return {
    isActive,
    currentLanguage,
    tasks,
    executeCommand,
    addTask,
    setLanguage
  };
};