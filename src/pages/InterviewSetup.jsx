import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Building2, Heart, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import Textarea from '../components/UI/Textarea';
import Card from '../components/UI/Card';
import { useInterview } from '../hooks/useInterview';
import { EXPERIENCE_LEVELS, DEFAULT_ROLES, INDUSTRIES } from '../utils/constants';

const InterviewSetup = () => {
  const navigate = useNavigate();
  const { startInterview, isStartingInterview } = useInterview();
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      candidate_name: '',
      experience_level: '',
      target_role: 'Data Analyst',
      industry: 'Technology',
      interests: ''
    }
  });

  const steps = [
    {
      title: 'Personal Information',
      icon: User,
      fields: ['candidate_name', 'experience_level']
    },
    {
      title: 'Professional Details',
      icon: Briefcase,
      fields: ['target_role', 'industry']
    },
    {
      title: 'Areas of Interest',
      icon: Heart,
      fields: ['interests']
    }
  ];

  const nextStep = async () => {
    const currentFields = steps[currentStep].fields;
    const isValid = await trigger(currentFields);
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await startInterview(data);
      toast.success('Interview setup completed successfully!');
      navigate(`/interview/${response.interview_id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to start interview');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register('candidate_name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              error={errors.candidate_name?.message}
            />
            
            <Select
              label="Experience Level"
              placeholder="Select your Excel experience level"
              options={EXPERIENCE_LEVELS}
              {...register('experience_level', {
                required: 'Experience level is required'
              })}
              error={errors.experience_level?.message}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <Select
              label="Target Role"
              placeholder="Select your target role"
              options={DEFAULT_ROLES.map(role => ({ value: role, label: role }))}
              {...register('target_role')}
              error={errors.target_role?.message}
            />
            
            <Select
              label="Industry"
              placeholder="Select your industry"
              options={INDUSTRIES.map(industry => ({ value: industry, label: industry }))}
              {...register('industry')}
              error={errors.industry?.message}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Textarea
              label="Areas of Interest (Optional)"
              placeholder="Tell us about specific Excel features or topics you'd like to focus on..."
              rows={4}
              {...register('interests', {
                maxLength: { value: 500, message: 'Please keep it under 500 characters' }
              })}
              error={errors.interests?.message}
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What to expect:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 6-12 personalized questions based on your profile</li>
                <li>• Real-world Excel scenarios relevant to your industry</li>
                <li>• Immediate feedback on each answer</li>
                <li>• Comprehensive skill assessment report</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Setup Your Interview
          </h1>
          <p className="text-gray-600">
            Help us create a personalized Excel interview experience for you
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    index < steps.length - 1 ? 'flex-1' : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isActive
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`mt-2 text-xs font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {steps[currentStep].title}
              </h2>
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={currentStep === 0 ? 'invisible' : ''}
              >
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={isStartingInterview}
                  disabled={isStartingInterview}
                  className="ml-auto bg-green-600 hover:bg-green-700"
                >
                  {isStartingInterview ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting Interview...
                    </>
                  ) : (
                    <>
                      Start Interview
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Tips Section */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50">
          <h3 className="font-medium text-gray-900 mb-3">💡 Interview Tips</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Be specific in your answers and provide step-by-step explanations</li>
            <li>• Think about real-world applications of Excel features</li>
            <li>• Don't worry if you don't know everything - explain your thought process</li>
            <li>• Take your time to provide thoughtful, detailed responses</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default InterviewSetup;