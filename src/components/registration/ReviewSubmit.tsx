
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { RegistrationData } from '../RegistrationSystem';

interface ReviewSubmitProps {
  data: RegistrationData;
  onPrev: () => void;
}

const ReviewSubmit = ({ data, onPrev }: ReviewSubmitProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitRegistration = async () => {
    setSubmitting(true);
    
    // Simulate form submission to Google Forms
    const formData = {
      'entry.name': data.name,
      'entry.aadhaar': data.aadhaarNumber,
      'entry.dob': data.dob,
      'entry.mobile': data.mobileNumber,
      'entry.email': data.email,
      'entry.exam': data.examType,
      'entry.center': data.examCenter,
      'entry.payment': data.paymentStatus,
      'entry.timestamp': new Date().toISOString()
    };

    console.log('Submitting to Google Forms:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "Your exam registration has been completed successfully",
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="animate-fade-in">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">✓</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your examination registration has been completed successfully.
          </p>
          
          <Card className="p-6 mb-6 text-left">
            <h3 className="font-semibold mb-4">Registration Details</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Registration ID:</strong> EDQ{Date.now()}</p>
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Exam:</strong> {data.examType}</p>
              <p><strong>Center:</strong> {data.examCenter}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </Card>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              📧 Confirmation email sent to {data.email}
            </p>
            <p className="text-sm text-gray-600">
              📱 SMS confirmation sent to {data.mobileNumber}
            </p>
            <Button className="w-full">
              Download Admit Card
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
        <p className="text-gray-600">Please review your details before final submission</p>
      </div>

      <div className="space-y-6">
        {/* Personal Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <p className="font-medium">{data.name}</p>
            </div>
            <div>
              <span className="text-gray-600">Date of Birth:</span>
              <p className="font-medium">{data.dob}</p>
            </div>
            <div>
              <span className="text-gray-600">Mobile:</span>
              <p className="font-medium">{data.mobileNumber}</p>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <span className="text-gray-600">Aadhaar:</span>
              <p className="font-medium">{data.aadhaarNumber}</p>
            </div>
          </div>
        </Card>

        {/* Exam Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Exam Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Exam Type:</span>
              <p className="font-medium">{data.examType}</p>
            </div>
            <div>
              <span className="text-gray-600">Exam Center:</span>
              <p className="font-medium">{data.examCenter}</p>
            </div>
            <div>
              <span className="text-gray-600">Registration Fee:</span>
              <p className="font-medium">₹{data.fees}</p>
            </div>
            <div>
              <span className="text-gray-600">Payment Status:</span>
              <p className="font-medium text-green-600">✓ Completed</p>
            </div>
          </div>
        </Card>

        {/* Terms and Conditions */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Terms and Conditions</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• I confirm that all the information provided is accurate and complete</p>
              <p>• I understand that providing false information may lead to cancellation of registration</p>
              <p>• I agree to the examination guidelines and code of conduct</p>
              <p>• I acknowledge that the registration fee is non-refundable</p>
              <p>• I consent to receive communications regarding the examination</p>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" required className="rounded" />
              <span className="text-sm">I agree to all terms and conditions</span>
            </label>
          </div>
        </Card>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1" disabled={submitting}>
            Back to Payment
          </Button>
          <Button onClick={submitRegistration} className="flex-1" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
