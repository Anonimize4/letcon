import React from 'react';

interface DifficultyBadgeProps {
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  className?: string;
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className = '' }) => {
  const difficultyConfig = {
    beginner: {
      label: 'Beginner',
      className: 'bg-green-100 text-htb-bright-white border-green-200',
    },
    intermediate: {
      label: 'Intermediate',
      className: 'bg-yellow-100 text-htb-bright-white border-yellow-200',
    },
    advanced: {
      label: 'Advanced',
      className: 'bg-orange-100 text-htb-bright-white border-orange-200',
    },
    expert: {
      label: 'Expert',
      className: 'bg-red-100 text-htb-bright-white border-red-200',
    },
  };

  const config = difficultyConfig[difficulty];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default DifficultyBadge;
