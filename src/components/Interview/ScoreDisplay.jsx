import React from 'react';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { getScoreRange } from '../../utils/helpers';

const ScoreDisplay = ({ 
  score = 0, 
  size = 'md', 
  showLabel = true, 
  showIcon = true,
  className = '' 
}) => {
  const scoreRange = getScoreRange(score);
  
  const sizes = {
    xs: {
      container: 'text-xs',
      score: 'text-sm font-semibold',
      icon: 'w-3 h-3'
    },
    sm: {
      container: 'text-sm',
      score: 'text-base font-semibold',
      icon: 'w-4 h-4'
    },
    md: {
      container: 'text-base',
      score: 'text-lg font-bold',
      icon: 'w-5 h-5'
    },
    lg: {
      container: 'text-lg',
      score: 'text-2xl font-bold',
      icon: 'w-6 h-6'
    }
  };

  const colors = {
    success: 'text-green-600 bg-green-100 border-green-200',
    warning: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    error: 'text-red-600 bg-red-100 border-red-200'
  };

  const getIcon = () => {
    if (score >= 80) return TrendingUp;
    if (score >= 60) return Award;
    return AlertTriangle;
  };

  const Icon = getIcon();
  const sizeConfig = sizes[size];
  const colorConfig = colors[scoreRange.color];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${colorConfig} ${sizeConfig.container} ${className}`}>
      {showIcon && <Icon className={sizeConfig.icon} />}
      
      <span className={sizeConfig.score}>
        {Math.round(score)}%
      </span>
      
      {showLabel && (
        <span className="font-medium">
          {scoreRange.label}
        </span>
      )}
    </div>
  );
};

export default ScoreDisplay;
