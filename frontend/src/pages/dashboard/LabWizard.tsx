import React from 'react';
import { 
  FlaskConical, 
  ChevronRight, 
  CheckCircle, 
  Settings, 
  Play, 
  Save,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LabWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(1);
  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Lab name and description' },
    { number: 2, title: 'Configuration', description: 'Environment settings' },
    { number: 3, title: 'Content', description: 'Instructions and challenges' },
    { number: 4, title: 'Review', description: 'Finalize and create' },
  ];

  return (
    <div className="min-h-screen bg-htb-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-htb-foreground hover:text-htb-bright-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center space-x-3">
            <FlaskConical className="h-8 w-8 text-htb-cyan" />
            <h1 className="text-3xl font-bold text-htb-bright-white">Lab Wizard</h1>
          </div>
          <p className="text-htb-foreground mt-2">Create a new cybersecurity lab environment step by step</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setCurrentStep(step.number)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                      currentStep >= step.number
                        ? 'bg-htb-cyan text-htb-background'
                        : 'bg-htb-selection-background text-htb-foreground'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </button>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-htb-bright-white' : 'text-htb-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-htb-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-htb-cyan' : 'bg-htb-selection-background'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-8 mb-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Lab Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="Enter lab name..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="Describe what users will learn..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Difficulty Level
                  </label>
                  <select className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-6">Environment Configuration</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Docker Image
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="e.g., ubuntu:22.04"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Port Configuration
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="e.g., 80, 443, 8080"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-htb-selection-background" />
                    <span className="text-htb-bright-white">Enable SSH Access</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-htb-selection-background" />
                    <span className="text-htb-bright-white">Enable Web Terminal</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-6">Lab Content</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Learning Objectives
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="What will users learn..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Lab Instructions
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="Step by step instructions..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Hints (Optional)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="Provide helpful hints..."
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-6">Review & Create</h2>
              <div className="bg-htb-selection-background/10 border border-htb-selection-background rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-4">Lab Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-htb-foreground">Status:</span>
                    <span className="text-yellow-400">Draft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-htb-foreground">Steps Completed:</span>
                    <span className="text-htb-bright-white">3/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-htb-foreground">Environment:</span>
                    <span className="text-htb-bright-white">Docker</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-htb-foreground">Last Modified:</span>
                    <span className="text-htb-bright-white">Just now</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  Your lab will be saved as a draft. You can continue editing after creation.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-htb-selection-background/30 text-htb-foreground cursor-not-allowed'
                : 'bg-htb-selection-background text-htb-bright-white hover:bg-htb-selection-background'
            }`}
          >
            <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
            Previous
          </button>

          <div className="flex space-x-4">
            <button className="flex items-center px-6 py-3 bg-htb-selection-background/30 text-htb-foreground rounded-lg font-medium hover:bg-htb-selection-background/50 transition-all duration-200">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="flex items-center px-6 py-3 bg-htb-cyan text-htb-background rounded-lg font-medium hover:bg-htb-cyan/80 transition-all duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-500/80 transition-all duration-200">
                <Play className="h-4 w-4 mr-2" />
                Create Lab
              </button>
            )}
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-8 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <p className="text-green-400 font-medium">Lab Wizard is Operational</p>
          </div>
          <p className="text-htb-foreground text-sm mt-1">
            Follow the steps above to create a new cybersecurity lab environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabWizard;

