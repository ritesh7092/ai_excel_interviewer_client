import React from 'react';
import { FileText, BarChart, Hash, Settings } from 'lucide-react';
import Card from '../UI/Card';

const QuestionCard = ({ question, questionNumber }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Formulas': Hash,
      'Data Analysis': BarChart,
      'Pivot Tables': BarChart,
      'Charts': BarChart,
      'VBA': Settings,
      'Power Query': Settings,
      'General': FileText
    };
    return icons[category] || FileText;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Formulas': 'text-blue-600 bg-blue-100',
      'Data Analysis': 'text-green-600 bg-green-100',
      'Pivot Tables': 'text-purple-600 bg-purple-100',
      'Charts': 'text-orange-600 bg-orange-100',
      'VBA': 'text-red-600 bg-red-100',
      'Power Query': 'text-indigo-600 bg-indigo-100',
      'General': 'text-gray-600 bg-gray-100'
    };
    return colors[category] || 'text-gray-600 bg-gray-100';
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty <= 2) return 'Easy';
    if (difficulty <= 3) return 'Medium';
    return 'Hard';
  };

  const Icon = getCategoryIcon(question.category);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
            <span className="text-sm font-bold text-blue-600">Q{questionNumber}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Question {questionNumber}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {question.category && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
              <Icon className="w-3 h-3 mr-1" />
              {question.category}
            </span>
          )}
          
          {question.difficulty && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyLabel(question.difficulty)}
            </span>
          )}
        </div>
      </div>

      {/* Question Content */}
      <div className="prose max-w-none">
        {question.question}
      </div>
      {question.scenario && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
          <strong>Scenario:</strong> {question.scenario}
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;
