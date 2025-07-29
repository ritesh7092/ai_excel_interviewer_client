import React, { createContext, useContext, useReducer } from 'react';

const InterviewContext = createContext();

const initialState = {
  currentInterview: null,
  interviewHistory: [],
  userPreferences: {
    autoSave: true,
    soundEnabled: true,
    theme: 'light'
  },
  loading: false,
  error: null
};

const interviewReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_CURRENT_INTERVIEW':
      return { ...state, currentInterview: action.payload, error: null };
    
    case 'UPDATE_INTERVIEW_STATUS':
      return {
        ...state,
        currentInterview: state.currentInterview ? {
          ...state.currentInterview,
          ...action.payload
        } : null
      };
    
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        interviewHistory: [...state.interviewHistory, action.payload]
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload }
      };
    
    case 'CLEAR_CURRENT_INTERVIEW':
      return { ...state, currentInterview: null };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
};

export const InterviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interviewReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setCurrentInterview = (interview) => {
    dispatch({ type: 'SET_CURRENT_INTERVIEW', payload: interview });
  };

  const updateInterviewStatus = (updates) => {
    dispatch({ type: 'UPDATE_INTERVIEW_STATUS', payload: updates });
  };

  const addToHistory = (interview) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: interview });
  };

  const updatePreferences = (preferences) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const clearCurrentInterview = () => {
    dispatch({ type: 'CLEAR_CURRENT_INTERVIEW' });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setCurrentInterview,
    updateInterviewStatus,
    addToHistory,
    updatePreferences,
    clearCurrentInterview,
    resetState
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};
