
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from './registration/Header';
import ProgressIndicator from './registration/ProgressIndicator';
import AadhaarAuth from './registration/AadhaarAuth';
import PersonalDetails from './registration/PersonalDetails';
import ExamDetails from './registration/ExamDetails';
import PaymentSection from './registration/PaymentSection';
import ReviewSubmit from './registration/ReviewSubmit';

export interface RegistrationData {
  aadhaarNumber: string;
  otp: string;
  name: string;
  dob: string;
  mobileNumber: string;
  email: string;
  examType: string;
  examCenter: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  fees: number;
}

const RegistrationSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    aadhaarNumber: '',
    otp: '',
    name: '',
    dob: '',
    mobileNumber: '',
    email: '',
    examType: '',
    examCenter: '',
    paymentStatus: 'pending',
    fees: 0
  });

  const steps = [
    'Aadhaar Authentication',
    'Personal Details',
    'Exam Details',
    'Payment',
    'Review & Submit'
  ];

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AadhaarAuth 
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PersonalDetails 
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ExamDetails 
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <PaymentSection 
            data={registrationData}
            updateData={updateRegistrationData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <ReviewSubmit 
            data={registrationData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <Header />
        <Card className="mt-12 shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
          <div className="p-10">
            <ProgressIndicator currentStep={currentStep} steps={steps} />
            <div className="mt-10 animate-fade-in">
              {renderStep()}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationSystem;
