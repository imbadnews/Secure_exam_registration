
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { RegistrationData } from '../RegistrationSystem';

interface AadhaarAuthProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const AadhaarAuth = ({ data, updateData, onNext }: AadhaarAuthProps) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateAadhaarNumber = (number: string) => {
    return /^\d{12}$/.test(number.replace(/\s/g, ''));
  };

  const formatAadhaarNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 14);
  };

  const sendOTP = async () => {
    if (!validateAadhaarNumber(data.aadhaarNumber)) {
      toast({
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      toast({
        title: "OTP Sent Successfully",
        description: "Please check your registered mobile number for OTP",
      });
    }, 2000);
  };

  const verifyOTP = async () => {
    if (data.otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setOtpVerified(true);
      setLoading(false);
      toast({
        title: "Aadhaar Verified Successfully",
        description: "Your identity has been verified",
      });
    }, 1500);
  };

  const handleNext = () => {
    if (!otpVerified) {
      toast({
        title: "Verification Required",
        description: "Please complete Aadhaar verification to proceed",
        variant: "destructive"
      });
      return;
    }
    onNext();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Aadhaar Authentication</h2>
        <p className="text-gray-600">Verify your identity using Aadhaar for secure registration</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="aadhaar">Aadhaar Number</Label>
          <Input
            id="aadhaar"
            placeholder="1234 5678 9012"
            value={data.aadhaarNumber}
            onChange={(e) => updateData({ aadhaarNumber: formatAadhaarNumber(e.target.value) })}
            maxLength={14}
            className={otpVerified ? "border-green-500 bg-green-50" : ""}
            disabled={otpVerified}
          />
          {otpVerified && (
            <div className="flex items-center text-green-600 text-sm">
              <span className="mr-1">✓</span>
              Aadhaar verified successfully
            </div>
          )}
        </div>

        {!otpSent && (
          <Button 
            onClick={sendOTP} 
            disabled={loading || !validateAadhaarNumber(data.aadhaarNumber)}
            className="w-full"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        )}

        {otpSent && !otpVerified && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={data.otp}
                onChange={(e) => updateData({ otp: e.target.value.replace(/\D/g, '').substring(0, 6) })}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>
            <Button 
              onClick={verifyOTP} 
              disabled={loading || data.otp.length !== 6}
              className="w-full"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button 
              variant="outline" 
              onClick={sendOTP} 
              disabled={loading}
              className="w-full"
            >
              Resend OTP
            </Button>
          </div>
        )}

        {otpVerified && (
          <Button onClick={handleNext} className="w-full animate-fade-in">
            Continue to Personal Details
          </Button>
        )}
      </Card>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>🔒 Your Aadhaar information is encrypted and secure</p>
        <p>Data is processed as per UIDAI guidelines</p>
      </div>
    </div>
  );
};

export default AadhaarAuth;
