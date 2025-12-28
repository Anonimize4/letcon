import React from 'react';

interface StatusBadgeProps {
  status: 'not-started' | 'in-progress' | 'completed';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig = {
    'not-started': {
      label: 'Not Started',
      className: 'bg-gray-100 text-htb-bright-white border-gray-200',
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-blue-100 text-htb-bright-white border-blue-200',
    },
    completed: {
      label: 'Completed',
      className: 'bg-green-100 text-htb-bright-white border-green-200',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
