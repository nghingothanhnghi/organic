// components/StepWizard.tsx
import React, { useState } from 'react';

interface Step {
    title: string;
    content: React.ReactNode;
    isValid?: boolean; // Add a validation flag
}

interface StepWizardProps {
    steps: Step[];
    currentStep: number;
    handleNext: () => void;
    handlePrevious: () => void;
}

const StepWizard: React.FC<StepWizardProps> = ({ steps, currentStep, handleNext, handlePrevious }) => {
    const totalSteps = steps.length;
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
    return (
        <div className="step-wizard">
            <div className="mb-6">
                <p className="text-xs font-medium text-gray-500">
                    {currentStep + 1}/{totalSteps} - {steps[currentStep]?.title}
                </p>
                <div className="mt-4 overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-2 rounded-full bg-green-600 transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-500 ease-in-out ${index === currentStep ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                    >
                        {step.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepWizard;
