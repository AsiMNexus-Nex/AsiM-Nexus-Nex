import React, { useState, useEffect } from 'react';
import { Database, Lock, Download, Upload, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DataManagerProps {
  language: string;
}

export const DataManager: React.FC<DataManagerProps> = ({ language }) => {
  const [data, setData] = useLocalStorage('asim-nexus-data', {});
  const [storageUsed, setStorageUsed] = useState(0);

  useEffect(() => {
    const calculateStorage = () => {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      setStorageUsed(total);
    };
    calculateStorage();
  }, [data]);

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'asim-nexus-backup.json';
    link.click();
  };

  const clearData = () => {
    if (confirm(language === 'ne' ? 'के तपाईं सबै डेटा मेटाउन चाहनुहुन्छ?' : 
                language === 'hi' ? 'क्या आप सभी डेटा मिटाना चाहते हैं?' : 
                'Are you sure you want to clear all data?')) {
      setData({});
    }
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          {language === 'ne' ? 'डेटा व्यवस्थापन' : 
           language === 'hi' ? 'डेटा प्रबंधन' : 'Data Management'}
        </h3>
        <Lock className="w-5 h-5 text-green-400" />
      </div>

      <div className="space-y-4">
        {/* Storage Info */}
        <div className="p-3 bg-slate-800/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">
              {language === 'ne' ? 'भण्डारण प्रयोग' : 
               language === 'hi' ? 'स्टोरेज उपयोग' : 'Storage Used'}
            </span>
            <span className="text-sm text-blue-400">
              {(storageUsed / 1024).toFixed(2)} KB
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((storageUsed / (5 * 1024 * 1024)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Data Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={exportData}
            className="flex items-center justify-center space-x-2 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs">
              {language === 'ne' ? 'निर्यात' : 
               language === 'hi' ? 'निर्यात' : 'Export'}
            </span>
          </button>
          
          <button
            onClick={clearData}
            className="flex items-center justify-center space-x-2 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs">
              {language === 'ne' ? 'सफा गर्नुहोस्' : 
               language === 'hi' ? 'साफ़ करें' : 'Clear'}
            </span>
          </button>
        </div>

        {/* Recent Data */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">
            {language === 'ne' ? 'हालैका डेटा' : 
             language === 'hi' ? 'हाल का डेटा' : 'Recent Data'}
          </h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {Object.keys(data).length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">
                {language === 'ne' ? 'कुनै डेटा छैन' : 
                 language === 'hi' ? 'कोई डेटा नहीं' : 'No data stored'}
              </p>
            ) : (
              Object.keys(data).slice(0, 5).map((key) => (
                <div key={key} className="flex items-center justify-between p-2 bg-slate-800/20 rounded text-xs">
                  <span className="text-gray-300 truncate">{key}</span>
                  <Database className="w-3 h-3 text-gray-500" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};