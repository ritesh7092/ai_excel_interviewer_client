import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Save } from 'lucide-react';
import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import Card from '../UI/Card';

const AnswerForm = ({ 
  value, 
  onChange, 
  onSubmit, 
  isSubmitting, 
  placeholder = "Enter your answer here...",
  showSaveAsDraft = true 
}) => {
  const [savedDraft, setSavedDraft] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleKeyDown = (e) => {
    // Submit with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const saveAsDraft = () => {
    // In a real app, this would save to localStorage or send to server
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = value.length;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Your Answer</h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full min-h-[200px] p-4 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={isSubmitting}
          />
          
          {/* Character/Word count */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white px-2 py-1 rounded">
            {wordCount} words • {charCount} characters
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showSaveAsDraft && (
              <Button
                variant="ghost"
                size="sm"
                onClick={saveAsDraft}
                disabled={!value.trim() || isSubmitting}
              >
                <Save className="h-4 w-4 mr-1" />
                {savedDraft ? 'Saved!' : 'Save Draft'}
              </Button>
            )}
            
            <span className="text-xs text-gray-500">
              Press Ctrl+Enter to submit quickly
            </span>
          </div>

          <div className="text-xs text-gray-500">
            {value.length < 10 && value.length > 0 && (
              <span className="text-orange-600">
                ⚠️ Consider providing more detail
              </span>
            )}
            {value.length >= 10 && value.length < 50 && (
              <span className="text-yellow-600">
                📝 Good start, add more details
              </span>
            )}
            {value.length >= 50 && (
              <span className="text-green-600">
                ✅ Good level of detail
              </span>
            )}
          </div>
        </div>

        {/* Writing tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            💡 How to write a great answer:
          </h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Explain your step-by-step approach</li>
            <li>• Mention specific Excel functions and features</li>
            <li>• Consider alternative solutions or approaches</li>
            <li>• Explain why your solution is effective</li>
            <li>• Include any assumptions you're making</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default AnswerForm;