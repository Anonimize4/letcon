import React from 'react';
import DifficultyBadge from '../badges/DifficultyBadge';
import StatusBadge from '../badges/StatusBadge';

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  points: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  solvedBy?: number;
  onClick?: () => void;
  className?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  difficulty,
  category,
  points,
  status,
  solvedBy,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 ${className}`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 mb-2">{category}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <DifficultyBadge difficulty={difficulty} />
            {status && <StatusBadge status={status} />}
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-blue-600">{points} points</span>
            {solvedBy !== undefined && (
              <span className="text-sm text-gray-500">{solvedBy} solved</span>
            )}
          </div>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
