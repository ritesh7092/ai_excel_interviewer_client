// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Name validation
export const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
};

// Answer validation
export const validateAnswer = (answer) => {
  return answer && answer.trim().length >= 10 && answer.trim().length <= 5000;
};

// Experience level validation
export const validateExperienceLevel = (level) => {
  const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
  return validLevels.includes(level);
};

// Form validation schema
export const interviewSetupSchema = {
  candidate_name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 100, message: 'Name must be less than 100 characters' },
    validate: (value) => validateName(value) || 'Please enter a valid name'
  },
  experience_level: {
    required: 'Experience level is required',
    validate: (value) => validateExperienceLevel(value) || 'Please select a valid experience level'
  },
  target_role: {
    maxLength: { value: 100, message: 'Role must be less than 100 characters' }
  },
  industry: {
    maxLength: { value: 100, message: 'Industry must be less than 100 characters' }
  },
  interests: {
    maxLength: { value: 500, message: 'Interests must be less than 500 characters' }
  }
};

// Answer submission validation
export const answerSchema = {
  answer: {
    required: 'Answer is required',
    minLength: { value: 10, message: 'Answer must be at least 10 characters' },
    maxLength: { value: 5000, message: 'Answer must be less than 5000 characters' },
    validate: (value) => validateAnswer(value) || 'Please provide a detailed answer'
  }
};
