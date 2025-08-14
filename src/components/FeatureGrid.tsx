import React from 'react';
import { 
  Brain, 
  Mic, 
  Globe, 
  Cog, 
  Database, 
  Shield, 
  Zap, 
  Smartphone 
} from 'lucide-react';

interface FeatureGridProps {
  language: string;
  onFeatureSelect: (feature: string) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ language, onFeatureSelect }) => {
  const features = [
    {
      icon: Brain,
      key: 'qcore',
      name: {
        ne: 'QCore AI',
        hi: 'QCore AI', 
        en: 'QCore AI'
      },
      desc: {
        ne: 'मल्टि-एजेन्ट AI कोर',
        hi: 'मल्टी-एजेंट AI कोर',
        en: 'Multi-Agent AI Core'
      }
    },
    {
      icon: Mic,
      key: 'voice',
      name: {
        ne: 'आवाज नियन्त्रण',
        hi: 'आवाज नियंत्रण',
        en: 'Voice Control'
      },
      desc: {
        ne: 'TTS/STT सपोर्ट',
        hi: 'TTS/STT सपोर्ट',
        en: 'TTS/STT Support'
      }
    },
    {
      icon: Globe,
      key: 'multilang',
      name: {
        ne: 'बहुभाषिक',
        hi: 'बहुभाषी',
        en: 'Multi-Language'
      },
      desc: {
        ne: 'नेपाली, अंग्रेजी, हिन्दी',
        hi: 'नेपाली, अंग्रेजी, हिन्दी',
        en: 'Nepali, English, Hindi'
      }
    },
    {
      icon: Cog,
      key: 'automation',
      name: {
        ne: 'स्वचालन',
        hi: 'स्वचालन',
        en: 'Automation'
      },
      desc: {
        ne: 'कार्य स्वचालन',
        hi: 'कार्य स्वचालन',
        en: 'Task Automation'
      }
    },
    {
      icon: Database,
      key: 'data',
      name: {
        ne: 'डेटा व्यवस्थापन',
        hi: 'डेटा प्रबंधन',
        en: 'Data Management'
      },
      desc: {
        ne: 'सुरक्षित भण्डारण',
        hi: 'सुरक्षित भंडारण',
        en: 'Secure Storage'
      }
    },
    {
      icon: Shield,
      key: 'security',
      name: {
        ne: 'सुरक्षा',
        hi: 'सुरक्षा',
        en: 'Security'
      },
      desc: {
        ne: 'एन्क्रिप्टेड डेटा',
        hi: 'एन्क्रिप्टेड डेटा',
        en: 'Encrypted Data'
      }
    },
    {
      icon: Zap,
      key: 'optimization',
      name: {
        ne: 'अनुकूलन',
        hi: 'अनुकूलन',
        en: 'Optimization'
      },
      desc: {
        ne: 'स्वत: अनुकूलन',
        hi: 'स्वत: अनुकूलन',
        en: 'Auto Optimization'
      }
    },
    {
      icon: Smartphone,
      key: 'mobile',
      name: {
        ne: 'मोबाइल तयार',
        hi: 'मोबाइल तैयार',
        en: 'Mobile Ready'
      },
      desc: {
        ne: 'सबै डिभाइसमा',
        hi: 'सभी डिवाइस पर',
        en: 'All Devices'
      }
    }
  ];

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        {language === 'ne' ? 'सिस्टम फिचरहरू' : 
         language === 'hi' ? 'सिस्टम फीचर्स' : 'System Features'}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.key}
              onClick={() => onFeatureSelect(feature.key)}
              className="p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-gray-600 hover:border-blue-400 transition-all group"
            >
              <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="text-sm font-medium text-white mb-1">
                {feature.name[language as keyof typeof feature.name]}
              </h4>
              <p className="text-xs text-gray-400">
                {feature.desc[language as keyof typeof feature.desc]}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};