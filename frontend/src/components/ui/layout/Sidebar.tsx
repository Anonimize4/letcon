import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, FileText, PlayCircle, CheckCircle, Lock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  isLocked?: boolean;
  progress?: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'lab' | 'quiz';
  duration: string;
  completed?: boolean;
  current?: boolean;
}

interface SidebarProps {
  modules: Module[];
  currentLessonId?: string;
  onLessonSelect?: (lessonId: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  modules,
  currentLessonId,
  onLessonSelect,
  className = ''
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['module-1']));

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonIcon = (type: Lesson['type'], completed?: boolean) => {
    if (completed) {
      return <CheckCircle className="w-4 h-4 text-htb-green" />;
    }
    
    switch (type) {
      case 'theory':
        return <FileText className="w-4 h-4 text-htb-foreground" />;
      case 'lab':
        return <PlayCircle className="w-4 h-4 text-htb-cyan" />;
      case 'quiz':
        return <BookOpen className="w-4 h-4 text-htb-yellow" />;
      default:
        return <FileText className="w-4 h-4 text-htb-foreground" />;
    }
  };

  const getLessonTypeColor = (type: Lesson['type']) => {
    switch (type) {
      case 'theory':
        return 'text-htb-foreground';
      case 'lab':
        return 'text-htb-cyan';
      case 'quiz':
        return 'text-htb-yellow';
      default:
        return 'text-htb-foreground';
    }
  };

  return (
    <div className={`w-80 bg-htb-selection-background border-r border-gray-700 h-full overflow-y-auto ${className}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-htb-bright-white mb-4">Course Content</h2>
        
        <div className="space-y-2">
          {modules.map((module) => (
            <div key={module.id} className="border border-gray-700 rounded-lg overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-3 bg-htb-background hover:bg-htb-selection-background transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  {module.isLocked ? (
                    <Lock className="w-4 h-4 text-gray-500" />
                  ) : (
                    expandedModules.has(module.id) ? (
                      <ChevronDown className="w-4 h-4 text-htb-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-htb-foreground" />
                    )
                  )}
                  <div className="text-left">
                    <h3 className="font-medium text-htb-bright-white">{module.title}</h3>
                    {module.description && (
                      <p className="text-xs text-htb-foreground mt-1">{module.description}</p>
                    )}
                  </div>
                </div>
                
                {module.progress !== undefined && (
                  <div className="text-xs text-htb-foreground">
                    {Math.round(module.progress)}%
                  </div>
                )}
              </button>

              {/* Module Content */}
              {expandedModules.has(module.id) && !module.isLocked && (
                <div className="bg-htb-background">
                  {module.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => onLessonSelect?.(lesson.id)}
                      className={`w-full p-3 flex items-center justify-between hover:bg-htb-selection-background transition-colors duration-200 border-t border-gray-800 ${
                        lesson.current || currentLessonId === lesson.id
                          ? 'bg-htb-selection-background border-l-4 border-l-htb-green'
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-xs text-gray-500 w-6">
                          {index + 1}.
                        </span>
                        {getLessonIcon(lesson.type, lesson.completed)}
                        <div className="text-left flex-1">
                          <p className={`text-sm font-medium ${
                            lesson.current || currentLessonId === lesson.id
                              ? 'text-htb-bright-white'
                              : getLessonTypeColor(lesson.type)
                          }`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
