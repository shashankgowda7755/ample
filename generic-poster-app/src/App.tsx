import React, { useState } from 'react';
import { UserData, Step } from './types';
import Hero from './components/Hero';
import UserForm from './components/UserForm';
import Preview from './components/Preview';
import Success from './components/Success';

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<Step>(Step.Hero);

    // State to hold user data across steps (allows editing without data loss)
    const [userData, setUserData] = useState<UserData>({
        fullName: '',
        email: '',
        phone: '',
        photo: undefined,
        // watchModel removed
    });

    // Flow: Landing -> Form
    const handleStart = () => {
        setCurrentStep(Step.Form);
    };

    // Flow: Form -> Preview
    const handleFormSubmit = (data: UserData) => {
        setUserData(data);
        setCurrentStep(Step.Preview);
    };

    // Flow: Edit Details (Preview -> Form)
    const handleEdit = () => {
        setCurrentStep(Step.Form);
    };

    // Flow: Finalize (Preview -> Success)
    const handleFinalize = () => {
        setCurrentStep(Step.Success);
    };

    // Restart
    const handleReset = () => {
        setUserData({ fullName: '', email: '', phone: '', photo: undefined });
        setCurrentStep(Step.Hero);
    };

    return (
        <div className="min-h-screen font-sans">
            {currentStep === Step.Hero && (
                <Hero onStart={handleStart} />
            )}

            {currentStep === Step.Form && (
                <UserForm
                    initialData={userData}
                    onSubmit={handleFormSubmit}
                    onBack={() => setCurrentStep(Step.Hero)}
                />
            )}

            {currentStep === Step.Preview && (
                <Preview
                    userData={userData}
                    onEdit={handleEdit}
                    onFinalize={handleFinalize}
                />
            )}

            {currentStep === Step.Success && (
                <Success
                    userData={userData}
                    onReset={handleReset}
                />
            )}
        </div>
    );
};

export default App;
