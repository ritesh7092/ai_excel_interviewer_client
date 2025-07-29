import React from 'react';
import { BarChart, TrendingUp, AlertCircle, CheckCircle, Clock, User } from 'lucide-react';
import Card from '../UI/Card';
import ScoreDisplay from './ScoreDisplay';
import { formatDuration } from '../../utils/helpers';

const ReportSummary = ({ interview, report, questionsAndAnswers }) => {
  const calculateCategoryAverages = () => {
    const categories = {};
    
    questionsAndAnswers.forEach(qa => {
      const category = qa.category || 'General';
      if (!categories[category]) {
        categories[category] = { total: 0, count: 0 };
      }
      categories[category].total += qa.score;
      categories[category].count += 1;
    });

    return Object.entries(categories).map(([category, data]) => ({
      category,
      average: Math.round(data.total / data.count),
      count: data.count
    }));
  };

  const categoryAverages = calculateCategoryAverages();
  const overallScore = report.performance_metrics?.overall_score || interview.total_score;

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Executive Summary</h2>
            <p className="text-gray-600">Overall performance assessment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Overall Score */}
          <div className="text-center">
            <div className="mb-2">
              <ScoreDisplay score={overallScore} size="lg" showLabel={false} />
            </div>
            <p className="text-sm text-gray-600">Overall Score</p>
          </div>

          {/* Questions Answered */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                {interview.questions_answered}
              </span>
            </div>
            <p className="text-sm text-gray-600">Questions Answered</p>
          </div>

          {/* Duration */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                {Math.round(interview.duration_minutes || 0)}m
              </span>
            </div>
            <p className="text-sm text-gray-600">Interview Duration</p>
          </div>

          {/* Experience Level */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <User className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-lg font-bold text-gray-900 capitalize">
                {interview.experience_level}
              </span>
            </div>
            <p className="text-sm text-gray-600">Experience Level</p>
          </div>
        </div>

        {/* Executive Summary Text */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">
            {report.executiveSummary || 
             `Based on the interview performance, ${interview.candidate_name} demonstrated ${
               overallScore >= 80 ? 'excellent' : overallScore >= 60 ? 'good' : 'developing'
             } Excel skills with a total score of ${Math.round(overallScore)}%. 
             The candidate answered ${interview.questions_answered} questions and showed particular strength in practical problem-solving.`
            }
          </p>
        </div>
      </Card>

      {/* Category Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h3>
        
        <div className="space-y-4">
          {categoryAverages.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{category.category}</span>
                  <ScoreDisplay score={category.average} size="sm" showIcon={false} />
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      category.average >= 80 ? 'bg-green-500' :
                      category.average >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${category.average}%` }}
                  />
                </div>
                
                <p className="text-xs text-gray-600 mt-1">
                  {category.count} question{category.count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Strengths</h3>
          </div>
          
          <ul className="space-y-2">
            {(report.strengths || [
              'Problem-solving approach',
              'Technical knowledge',
              'Clear explanations'
            ]).map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Areas for Improvement */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Growth Areas</h3>
          </div>
          
          <ul className="space-y-2">
            {(report.growthAreas || [
              'Advanced formula usage',
              'Data visualization techniques',
              'Automation concepts'
            ]).map((area, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{area}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Hiring Recommendation */}
      {report.hiringRecommendation && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hiring Recommendation</h3>
          
          <div className={`p-4 rounded-lg border ${
            report.hiringRecommendation === 'STRONG_HIRE' ? 'bg-green-50 border-green-200' :
            report.hiringRecommendation === 'HIRE' ? 'bg-blue-50 border-blue-200' :
            report.hiringRecommendation === 'CONDITIONAL_HIRE' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                report.hiringRecommendation === 'STRONG_HIRE' ? 'bg-green-200 text-green-800' :
                report.hiringRecommendation === 'HIRE' ? 'bg-blue-200 text-blue-800' :
                report.hiringRecommendation === 'CONDITIONAL_HIRE' ? 'bg-yellow-200 text-yellow-800' :
                'bg-red-200 text-red-800'
              }`}>
                {report.hiringRecommendation.replace('_', ' ')}
              </span>
              
              {report.confidenceLevel && (
                <span className="text-sm text-gray-600">
                  Confidence: {report.confidenceLevel}%
                </span>
              )}
            </div>
            
            <p className="text-gray-700">
              {report.roleSuitability || 'Based on the interview performance, this candidate shows potential for the target role.'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReportSummary;
