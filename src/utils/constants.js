export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Beginner (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)' },
  { value: 'advanced', label: 'Advanced (3-5 years)' },
  { value: 'expert', label: 'Expert (5+ years)' }
];

export const DEFAULT_ROLES = [
  'Data Analyst',
  'Business Analyst',
  'Financial Analyst',
  'Operations Analyst',
  'Marketing Analyst',
  'Project Manager',
  'Administrative Assistant',
  'Accountant',
  'Sales Representative',
  'Human Resources',
  'Other'
];

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Government',
  'Non-profit',
  'Real Estate',
  'General'
];

export const INTERVIEW_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  EXPIRED: 'expired'
};

export const SCORE_RANGES = {
  EXCELLENT: { min: 90, max: 100, color: 'success', label: 'Excellent' },
  GOOD: { min: 80, max: 89, color: 'success', label: 'Good' },
  AVERAGE: { min: 70, max: 79, color: 'warning', label: 'Average' },
  BELOW_AVERAGE: { min: 60, max: 69, color: 'warning', label: 'Below Average' },
  POOR: { min: 0, max: 59, color: 'error', label: 'Needs Improvement' }
};

export const API_ENDPOINTS = {
  START_INTERVIEW: '/api/v1/interview/start',
  SUBMIT_ANSWER: '/api/v1/interview/submit-answer',
  INTERVIEW_STATUS: '/api/v1/interview/{id}/status',
  INTERVIEW_REPORT: '/api/v1/interview/{id}/report',
  HEALTH_CHECK: '/api/v1/health/',
  DETAILED_HEALTH: '/api/v1/health/detailed'
};

export const STORAGE_KEYS = {
  INTERVIEW_DATA: 'excel_interview_data',
  USER_PREFERENCES: 'excel_interview_preferences',
  DRAFT_ANSWERS: 'excel_interview_drafts'
};