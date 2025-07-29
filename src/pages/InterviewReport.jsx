import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Download, 
  Share, 
  ArrowLeft, 
  FileText, 
  BarChart3, 
  MessageSquare,
  Printer,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ReportSummary from '../components/Interview/ReportSummary';
import ScoreDisplay from '../components/Interview/ScoreDisplay';
import { useInterview } from '../hooks/useInterview';
import { formatDate } from '../utils/helpers';

const InterviewReport = () => {
  const { interviewId } = useParams();
  const { useInterviewReport } = useInterview();
  const [activeTab, setActiveTab] = useState('summary');

  const { data: reportData, isLoading, error, refetch } = useInterviewReport(interviewId);

  const handleDownloadReport = () => {
    if (!reportData) return;
    
    // Create a simplified text version of the report
    const reportContent = `
EXCEL MOCK INTERVIEW REPORT
===========================

Candidate: ${reportData.interview.candidate_name}
Date: ${formatDate(reportData.interview.start_time)}
Experience Level: ${reportData.interview.experience_level}
Target Role: ${reportData.interview.target_role}
Industry: ${reportData.interview.industry}

OVERALL PERFORMANCE
==================
Total Score: ${Math.round(reportData.interview.total_score)}%
Questions Answered: ${reportData.interview.questions_answered}
Duration: ${Math.round(reportData.interview.duration_minutes || 0)} minutes

EXECUTIVE SUMMARY
================
${reportData.report.executiveSummary || 'No summary available'}

STRENGTHS
=========
${(reportData.report.strengths || []).map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT
====================
${(reportData.report.growthAreas || []).map(a => `• ${a}`).join('\n')}

LEARNING RECOMMENDATIONS
=======================
${(reportData.report.learningRecommendations || []).map(r => `• ${r}`).join('\n')}

HIRING RECOMMENDATION
====================
${reportData.report.hiringRecommendation || 'Not specified'}
Confidence Level: ${reportData.report.confidenceLevel || 0}%

DETAILED QUESTIONS & ANSWERS
============================
${reportData.questions_and_answers.map((qa, index) => 
  `Question ${index + 1}: ${qa.question}
  Category: ${qa.category}
  Difficulty: ${qa.difficulty}/5
  Answer: ${qa.answer}
  Score: ${qa.score}%
  Feedback: ${qa.feedback}
  
  `).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `excel-interview-report-${reportData.interview.candidate_name.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Report downloaded successfully!');
  };

  const handleShareReport = async () => {
    if (!reportData) return;
    
    const shareData = {
      title: `Excel Interview Report - ${reportData.interview.candidate_name}`,
      text: `I scored ${Math.round(reportData.interview.total_score)}% on my Excel Mock Interview!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Report link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share report');
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Generating your comprehensive report..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-red-500 mb-4">
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Report Not Available
          </h2>
          <p className="text-gray-600 mb-4">
            The interview report could not be loaded. This might happen if the interview is still in progress.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!reportData) return null;

  const tabs = [
    { id: 'summary', label: 'Summary', icon: BarChart3 },
    { id: 'detailed', label: 'Detailed Analysis', icon: FileText },
    { id: 'qa', label: 'Questions & Answers', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Interview Report
              </h1>
            </div>
            <p className="text-gray-600">
              {reportData.interview.candidate_name} • {reportData.interview.target_role} • 
              {formatDate(reportData.interview.start_time)}
            </p>
          </div>
          
          <div className="flex items-center gap-3 no-print">
            <Button variant="outline" onClick={handlePrintReport}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleShareReport}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Score Banner */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Congratulations, {reportData.interview.candidate_name}!
              </h2>
              <p className="text-gray-600">
                You've completed your Excel mock interview. Here's your comprehensive assessment.
              </p>
            </div>
            <div className="text-center">
              <ScoreDisplay 
                score={reportData.interview.total_score} 
                size="lg" 
                className="mb-2"
              />
              <p className="text-sm text-gray-600">Overall Score</p>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <div className="mb-6 no-print">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'summary' && (
            <ReportSummary
              interview={reportData.interview}
              report={reportData.report}
              questionsAndAnswers={reportData.questions_and_answers}
            />
          )}

          {activeTab === 'detailed' && (
            <div className="space-y-6">
              {/* Skill Assessment */}
              {reportData.report.skillAssessment && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Detailed Skill Assessment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(reportData.report.skillAssessment).map(([skill, data]) => (
                      <div key={skill} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 capitalize">
                            {skill.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <ScoreDisplay score={data.score} size="sm" showIcon={false} />
                        </div>
                        <p className="text-sm text-gray-600">{data.assessment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Learning Recommendations */}
              {reportData.report.learningRecommendations?.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Learning Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {reportData.report.learningRecommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-700">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{recommendation}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Next Steps */}
              {reportData.report.nextSteps && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-700">{reportData.report.nextSteps}</p>
                  </div>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Questions & Answers Review
                </h3>
                <p className="text-gray-600 mb-6">
                  Review all questions asked during your interview along with your answers and feedback.
                </p>

                <div className="space-y-6">
                  {reportData.questions_and_answers.map((qa, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">Q{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                {qa.category}
                              </span>
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                                Difficulty: {qa.difficulty}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <ScoreDisplay score={qa.score} size="sm" />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Question:</h5>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded">{qa.question}</p>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Your Answer:</h5>
                          <p className="text-gray-700 bg-blue-50 p-3 rounded">{qa.answer}</p>
                        </div>

                        {qa.feedback && (
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Feedback:</h5>
                            <p className="text-gray-700 bg-green-50 p-3 rounded">{qa.feedback}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                          <span>Response Time: {qa.response_time}s</span>
                          <span>Score: {qa.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 p-6 text-center bg-gradient-to-r from-green-50 to-blue-50 no-print">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ready for Another Challenge?
          </h3>
          <p className="text-gray-600 mb-4">
            Continue improving your Excel skills with another personalized interview.
          </p>
          <Link to="/setup">
            <Button className="bg-green-600 hover:bg-green-700">
              Take Another Interview
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default InterviewReport;
