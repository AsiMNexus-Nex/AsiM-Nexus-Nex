import React from 'react';
import { Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  timestamp: Date;
}

interface TaskQueueProps {
  tasks: Task[];
  language: string;
}

export const TaskQueue: React.FC<TaskQueueProps> = ({ tasks, language }) => {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'running': return <Play className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusText = (status: Task['status']) => {
    const statusMap = {
      pending: { ne: 'पर्खिरहेको', hi: 'प्रतीक्षारत', en: 'Pending' },
      running: { ne: 'चलिरहेको', hi: 'चल रहा', en: 'Running' },
      completed: { ne: 'सम्पन्न', hi: 'पूर्ण', en: 'Completed' },
      error: { ne: 'त्रुटि', hi: 'त्रुटि', en: 'Error' }
    };
    return statusMap[status][language as keyof typeof statusMap[status]];
  };

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        {language === 'ne' ? 'कार्य सूची' : 
         language === 'hi' ? 'कार्य सूची' : 'Task Queue'}
      </h3>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            {language === 'ne' ? 'कुनै कार्य छैन' : 
             language === 'hi' ? 'कोई कार्य नहीं' : 'No tasks'}
          </p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3">
                {getStatusIcon(task.status)}
                <div>
                  <p className="text-white text-sm font-medium">{task.name}</p>
                  <p className="text-xs text-gray-400">
                    {task.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-gray-300">
                {getStatusText(task.status)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};