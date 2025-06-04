
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { RegistrationData } from '../RegistrationSystem';

interface PersonalDetailsProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PersonalDetails = ({ data, updateData, onNext, onPrev }: PersonalDetailsProps) => {
  const validateForm = () => {
    if (!data.name || data.name.length < 2) {
      toast({
        title: "Invalid Name",
        description: "Please enter your full name as per Aadhaar",
        variant: "destructive"
      });
      return false;
    }

    if (!data.dob) {
      toast({
        title: "Date of Birth Required",
        description: "Please select your date of birth",
        variant: "destructive"
      });
      return false;
    }

    if (!/^\d{10}$/.test(data.mobileNumber)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  // Simulate fetching data from Aadhaar
  React.useEffect(() => {
    if (data.aadhaarNumber && !data.name) {
      // Simulate auto-fill from Aadhaar data
      setTimeout(() => {
        updateData({
          name: "John Doe", // This would come from Aadhaar API
          dob: "1995-05-15", // This would come from Aadhaar API
        });
        toast({
          title: "Details Auto-filled",
          description: "Information retrieved from Aadhaar records",
        });
      }, 1000);
    }
  }, [data.aadhaarNumber]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
        <p className="text-gray-600">Verify and complete your personal information</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name (as per Aadhaar) *</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
              className="bg-blue-50"
            />
            <p className="text-xs text-gray-500">Auto-filled from Aadhaar records</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth *</Label>
            <Input
              id="dob"
              type="date"
              value={data.dob}
              onChange={(e) => updateData({ dob: e.target.value })}
              className="bg-blue-50"
            />
            <p className="text-xs text-gray-500">Auto-filled from Aadhaar records</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              placeholder="10-digit mobile number"
              value={data.mobileNumber}
              onChange={(e) => updateData({ mobileNumber: e.target.value.replace(/\D/g, '').substring(0, 10) })}
              maxLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Note</h3>
          <p className="text-sm text-yellow-700">
            The name and date of birth are auto-filled from your Aadhaar records and cannot be modified. 
            If there's a mismatch, please contact support before proceeding.
          </p>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1">
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Continue to Exam Details
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PersonalDetails;
