import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewService } from '../services/interviewService';
import toast from 'react-hot-toast';

export const useInterview = () => {
  const queryClient = useQueryClient();
  const [currentInterview, setCurrentInterview] = useState(null);

  // Start interview mutation
  const startInterviewMutation = useMutation({
    mutationFn: interviewService.startInterview,
    onSuccess: (data) => {
      setCurrentInterview(data);
      toast.success(`Interview started! Welcome ${data.candidate_name}`);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to start interview');
    },
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: interviewService.submitAnswer,
    onSuccess: (data) => {
      if (data.status === 'completed') {
        toast.success('Interview completed! Generating your report...');
      } else {
        toast.success('Answer submitted successfully!');
      }
      // Invalidate interview status query
      queryClient.invalidateQueries(['interview-status']);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit answer');
    },
  });

  // Get interview status
  const useInterviewStatus = (interviewId) => {
    return useQuery({
      queryKey: ['interview-status', interviewId],
      queryFn: () => interviewService.getInterviewStatus(interviewId),
      enabled: !!interviewId,
      refetchInterval: 5000, // Refetch every 5 seconds
    });
  };

  // Get interview report
  const useInterviewReport = (interviewId) => {
    return useQuery({
      queryKey: ['interview-report', interviewId],
      queryFn: () => interviewService.getInterviewReport(interviewId),
      enabled: !!interviewId,
      retry: 3,
      retryDelay: 2000,
    });
  };

  // Start interview
  const startInterview = useCallback((candidateData) => {
    return startInterviewMutation.mutateAsync(candidateData);
  }, [startInterviewMutation]);

  // Submit answer
  const submitAnswer = useCallback((answerData) => {
    return submitAnswerMutation.mutateAsync(answerData);
  }, [submitAnswerMutation]);

  return {
    currentInterview,
    setCurrentInterview,
    startInterview,
    submitAnswer,
    useInterviewStatus,
    useInterviewReport,
    isStartingInterview: startInterviewMutation.isPending,
    isSubmittingAnswer: submitAnswerMutation.isPending,
  };
};
