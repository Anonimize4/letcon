import React, { useState } from 'react';
import { 
  FlaskConical, 
  ChevronRight, 
  CheckCircle, 
  Play, 
  Save,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LabFormData {
  // Step 1: Basic Info
  labName: string;
  description: string;
  difficulty: string;
  
  // Step 2: Configuration
  dockerImage: string;
  ports: string;
  enableSSH: boolean;
  enableTerminal: boolean;
  
  // Step 3: Content
  learningObjectives: string;
  instructions: string;
  hints: string;
}

const LabWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LabFormData>({
    labName: '',
    description: '',
    difficulty: 'Beginner',
    dockerImage: '',
    ports: '',
    enableSSH: false,
    enableTerminal: false,
    learningObjectives: '',
    instructions: '',
    hints: '',
  });

  const totalSteps = 4;

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Lab name and description' },
    { number: 2, title: 'Configuration', description: 'Environment settings' },
    { number: 3, title: 'Content', description: 'Instructions and challenges' },
    { number: 4, title: 'Review', description: 'Finalize and create' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.labName.trim()) {
        newErrors.labName = 'Lab name is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
    }

    if (step === 2) {
      if (!formData.dockerImage.trim()) {
        newErrors.dockerImage = 'Docker image is required';
      }
    }

    if (step === 3) {
      if (!formData.learningObjectives.trim()) {
        newErrors.learningObjectives = 'Learning objectives are required';
      }
      if (!formData.instructions.trim()) {
        newErrors.instructions = 'Instructions are required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(totalSteps, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    // Final validation
    if (!validateStep(4)) {
      return;
    }

    // In a real app, this would send the data to the backend
    console.log('Creating lab with form data:', formData);
    
    // Show success message and redirect
    alert('Lab created successfully! (Demo - no actual data sent)');
    navigate('/dashboard');
  };

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
                    onClick={() => {
                      // Only allow jumping to previous steps
                      if (step.number < currentStep) {
                        setCurrentStep(step.number);
                      }
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                      currentStep >= step.number
                        ? 'bg-htb-cyan text-htb-background'
                        : 'bg-htb-selection-background text-htb-foreground'
                    }`}
                    disabled={step.number >= currentStep}
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
                    Lab Name *
                  </label>
                  <input
                    type="text"
                    name="labName"
                    value={formData.labName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-htb-background border rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors ${
                      errors.labName ? 'border-red-500' : 'border-htb-selection-background'
                    }`}
                    placeholder="Enter lab name..."
                  />
                  {errors.labName && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.labName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 bg-htb-background border rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors ${
                      errors.description ? 'border-red-500' : 'border-htb-selection-background'
                    }`}
                    placeholder="Describe what users will learn..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
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
                    Docker Image *
                  </label>
                  <input
                    type="text"
                    name="dockerImage"
                    value={formData.dockerImage}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-htb-background border rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors ${
                      errors.dockerImage ? 'border-red-500' : 'border-htb-selection-background'
                    }`}
                    placeholder="e.g., ubuntu:22.04"
                  />
                  {errors.dockerImage && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.dockerImage}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Port Configuration
                  </label>
                  <input
                    type="text"
                    name="ports"
                    value={formData.ports}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="e.g., 80, 443, 8080 (comma-separated)"
                  />
                </div>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableSSH"
                      checked={formData.enableSSH}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border-htb-selection-background bg-htb-background text-htb-cyan focus:ring-htb-cyan"
                    />
                    <span className="text-htb-bright-white">Enable SSH Access</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableTerminal"
                      checked={formData.enableTerminal}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border-htb-selection-background bg-htb-background text-htb-cyan focus:ring-htb-cyan"
                    />
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
                    Learning Objectives *
                  </label>
                  <textarea
                    name="learningObjectives"
                    value={formData.learningObjectives}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-htb-background border rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors ${
                      errors.learningObjectives ? 'border-red-500' : 'border-htb-selection-background'
                    }`}
                    placeholder="What will users learn? (one objective per line)"
                  />
                  {errors.learningObjectives && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.learningObjectives}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Lab Instructions *
                  </label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-htb-background border rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors ${
                      errors.instructions ? 'border-red-500' : 'border-htb-selection-background'
                    }`}
                    placeholder="Step by step instructions for completing the lab..."
                  />
                  {errors.instructions && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.instructions}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-htb-bright-white mb-2">
                    Hints (Optional)
                  </label>
                  <textarea
                    name="hints"
                    value={formData.hints}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 bg-htb-background border border-htb-selection-background rounded-lg text-htb-bright-white focus:outline-none focus:border-htb-cyan transition-colors"
                    placeholder="Provide helpful hints (one per line)..."
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-htb-bright-white mb-6">Review & Create</h2>
              
              {/* Lab Name */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Lab Name</h3>
                <p className="text-htb-foreground">{formData.labName || '(Not specified)'}</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Description</h3>
                <p className="text-htb-foreground">{formData.description || '(Not specified)'}</p>
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Difficulty</h3>
                <p className="text-htb-foreground">{formData.difficulty}</p>
              </div>

              {/* Docker Configuration */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Docker Configuration</h3>
                <div className="space-y-2">
                  <p className="text-htb-foreground">Image: <span className="text-htb-bright-white">{formData.dockerImage || '(Not specified)'}</span></p>
                  <p className="text-htb-foreground">Ports: <span className="text-htb-bright-white">{formData.ports || 'Default'}</span></p>
                  <p className="text-htb-foreground">SSH: <span className="text-htb-bright-white">{formData.enableSSH ? 'Enabled' : 'Disabled'}</span></p>
                  <p className="text-htb-foreground">Web Terminal: <span className="text-htb-bright-white">{formData.enableTerminal ? 'Enabled' : 'Disabled'}</span></p>
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Learning Objectives</h3>
                <p className="text-htb-foreground whitespace-pre-wrap">{formData.learningObjectives || '(Not specified)'}</p>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Instructions</h3>
                <p className="text-htb-foreground whitespace-pre-wrap">{formData.instructions || '(Not specified)'}</p>
              </div>

              {/* Hints */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-htb-bright-white mb-3">Hints</h3>
                <p className="text-htb-foreground whitespace-pre-wrap">{formData.hints || 'No hints provided'}</p>
              </div>

              {/* Validation Summary */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                  Please review all information carefully before creating the lab.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
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
            <button
              onClick={() => {
                // Save draft functionality - in real app would send to backend
                console.log('Draft saved:', formData);
                alert('Draft saved successfully!');
              }}
              className="flex items-center px-6 py-3 bg-htb-selection-background/30 text-htb-foreground rounded-lg font-medium hover:bg-htb-selection-background/50 transition-all duration-200"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-htb-cyan text-htb-background rounded-lg font-medium hover:bg-htb-cyan/80 transition-all duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-500/80 transition-all duration-200"
              >
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
            Fill in all required fields to create your lab environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabWizard;

