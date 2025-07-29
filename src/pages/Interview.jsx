import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, Send, SkipForward } from 'lucide-react';
import toast from 'react-hot-toast';

import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import QuestionCard from '../components/Interview/QuestionCard';
import AnswerForm from '../components/Interview/AnswerForm';
import ScoreDisplay from '../components/Interview/ScoreDisplay';
import { useInterview } from '../hooks/useInterview';
import { useTimer } from '../hooks/useTimer';



const Interview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { submitAnswer, useInterviewStatus, isSubmittingAnswer } = useInterview();
  
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  // Timer for the current question
  const { time: questionTime, start: startTimer, reset: resetTimer, formattedTime } = useTimer();
  
  // Get interview status
  const { data: interviewStatus, isLoading, error, refetch } = useInterviewStatus(interviewId);

  useEffect(() => {
    if (interviewStatus) {
      startTimer();
      setQuestionStartTime(Date.now());
    }
  }, [interviewStatus?.progress?.current, startTimer]);

  useEffect(() => {
    if (interviewStatus?.status === 'completed') {
      toast.success('Interview completed! Redirecting to your report...');
      setTimeout(() => {
        navigate(`/report/${interviewId}`);
      }, 2000);
    }
  }, [interviewStatus?.status, navigate, interviewId]);

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim()) {
      toast.error('Please provide an answer before submitting');
      return;
    }

    const responseTime = (Date.now() - questionStartTime) / 1000;

    try {
      await submitAnswer({
        interview_id: interviewId,
        answer: currentAnswer,
        response_time: responseTime
      });

      // Clear answer and reset timer
      setCurrentAnswer('');
      resetTimer();
      setQuestionStartTime(Date.now());
      
      // Refetch status to get next question
      refetch();
    } catch (error) {
      toast.error(error.message || 'Failed to submit answer');
    }
  };

  const handleSkipQuestion = async () => {
    if (window.confirm('Are you sure you want to skip this question? You will receive a score of 0.')) {
      await handleSubmitAnswer();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your interview..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Interview Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The interview session could not be loaded. Please try starting a new interview.
          </p>
          <Button onClick={() => navigate('/setup')}>
            Start New Interview
          </Button>
        </Card>
      </div>
    );
  }

  if (!interviewStatus) {
    return null;
  }

//   const currentQuestion = interviewStatus.current_question;
let currentQuestion = null;

if (interviewStatus) {
  // First try to get the question from next_question
  currentQuestion = interviewStatus.next_question;
  
  // If no next_question, try questions array
  if (!currentQuestion && interviewStatus.questions && interviewStatus.progress) {
    currentQuestion = interviewStatus.questions[interviewStatus.progress.current];
  }
  
  // Log for debugging
  console.log('Debug Interview State:', {
    hasInterviewStatus: !!interviewStatus,
    currentQuestion: currentQuestion,
    progress: interviewStatus?.progress,
    questionsArray: interviewStatus?.questions?.length,
    nextQuestion: interviewStatus?.next_question,
  });
}

  const progress = interviewStatus.progress;


  // Add this just before your return statement
  console.log('Debug Interview State:', {
    hasInterviewStatus: !!interviewStatus,
    currentQuestion: currentQuestion,
    progress: interviewStatus?.progress,
    questionsArray: interviewStatus?.questions?.length,
    statusResponse: interviewStatus
  });

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Excel Interview - {interviewStatus.candidate_name}
              </h1>
              <p className="text-gray-600">
                Question {progress.current + 1} of {progress.total}
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="font-mono text-lg">{formattedTime}</span>
              </div>
              
              <ScoreDisplay 
                score={interviewStatus.current_score} 
                size="sm" 
              />
            </div>
          </div>
          
          <div className="mt-4">
            <ProgressBar 
              current={progress.current} 
              total={progress.total}
              showPercentage={true}
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Question */}
            {currentQuestion ? (
              <QuestionCard 
                question={currentQuestion}
                questionNumber={progress.current + 1}
              />
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600">No question available. Please refresh the page.</p>
              </Card>
            )}

            {/* Answer Form */}
            <AnswerForm
              value={currentAnswer}
              onChange={setCurrentAnswer}
              onSubmit={handleSubmitAnswer}
              isSubmitting={isSubmittingAnswer}
              placeholder="Provide a detailed answer explaining your approach, steps, and reasoning..."
            />

            {/* Action Buttons */}
            <div className="flex justify-between">
              {/* <Button
                variant="outline"
                onClick={handleSkipQuestion}
                disabled={isSubmittingAnswer}
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip Question
              </Button> */}

              <Button
                onClick={handleSubmitAnswer}
                loading={isSubmittingAnswer}
                disabled={!currentAnswer.trim() || isSubmittingAnswer}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Answer
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Progress */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Interview Progress</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Questions Answered</span>
                  <span className="font-medium">{progress.current}/{progress.total}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Score</span>
                  <ScoreDisplay score={interviewStatus.current_score} size="xs" />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-medium">{Math.round(interviewStatus.duration_minutes)} min</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    interviewStatus.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {interviewStatus.status === 'active' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">💡 Answering Tips</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Explain your step-by-step approach</li>
                <li>• Mention specific Excel functions</li>
                <li>• Consider real-world applications</li>
                <li>• Don't rush - quality over speed</li>
              </ul>
            </Card>

            {/* Emergency Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <div className="space-y-2">
                {/* <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => refetch()}
                >
                  Refresh Question
                </Button> */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to end the interview?')) {
                      navigate(`/report/${interviewId}`);
                    }
                  }}
                >
                  End Interview
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;