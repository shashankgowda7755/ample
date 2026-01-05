import React from 'react';
import { Step } from '../types';

interface HeaderProps {
    currentStep: Step;
}

const Header: React.FC<HeaderProps> = ({ currentStep }) => {
    const getSteps = () => {
        const steps = [
            { key: Step.Hero, label: 'Start', icon: '🏠' },
            { key: Step.Form, label: 'Details', icon: '📝' },
            { key: Step.Preview, label: 'Preview', icon: '👁️' },
            { key: Step.Success, label: 'Download', icon: '🎉' }
        ];

        const currentIndex = steps.findIndex(s => s.key === currentStep);

        return steps.map((step, index) => ({
            ...step,
            isActive: index === currentIndex,
            isCompleted: index < currentIndex
        }));
    };

    const steps = getSteps();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                            <span className="text-xl">🎨</span>
                        </div>
                        <span className="font-bold text-lg gradient-text hidden sm:block">
                            Poster Generator
                        </span>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.key}>
                                <div
                                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-full transition-all duration-300 ${step.isActive
                                            ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30'
                                            : step.isCompleted
                                                ? 'bg-green-500/10 border border-green-500/30'
                                                : 'opacity-40'
                                        }`}
                                >
                                    <span className="text-sm sm:text-base">{step.icon}</span>
                                    <span className="text-xs sm:text-sm font-medium hidden md:block">
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`w-4 sm:w-8 h-0.5 transition-all duration-300 ${step.isCompleted
                                                ? 'bg-gradient-to-r from-green-500 to-green-400'
                                                : 'bg-white/10'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
