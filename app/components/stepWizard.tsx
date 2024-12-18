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
    return (
        <div className="step-wizard">
            <div className="flex justify-between mb-6">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`flex-1 text-center transition-all ${index <= currentStep ? 'text-green-600' : 'text-gray-400'}`}
                    >
                        <div className="py-2 text-sm font-semibold">{step.title}</div>
                        {index < currentStep && <div className="h-1 bg-green-600"></div>}
                    </div>
                ))}
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
