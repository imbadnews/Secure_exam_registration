
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
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔐</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Aadhaar Authentication
        </h2>
        <p className="text-gray-600 leading-relaxed">Verify your identity using Aadhaar for secure registration</p>
      </div>

      <Card className="p-8 space-y-6 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
        <div className="space-y-3">
          <Label htmlFor="aadhaar" className="text-gray-700 font-medium">Aadhaar Number</Label>
          <Input
            id="aadhaar"
            placeholder="1234 5678 9012"
            value={data.aadhaarNumber}
            onChange={(e) => updateData({ aadhaarNumber: formatAadhaarNumber(e.target.value) })}
            maxLength={14}
            className={`h-12 text-lg transition-all duration-300 ${
              otpVerified 
                ? "border-green-400 bg-green-50 focus:ring-green-200" 
                : "border-gray-200 focus:border-blue-400 focus:ring-blue-200"
            }`}
            disabled={otpVerified}
          />
          {otpVerified && (
            <div className="flex items-center text-green-600 text-sm font-medium animate-fade-in">
              <span className="mr-2 text-lg">✓</span>
              Aadhaar verified successfully
            </div>
          )}
        </div>

        {!otpSent && (
          <Button 
            onClick={sendOTP} 
            disabled={loading || !validateAadhaarNumber(data.aadhaarNumber)}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending OTP...
              </div>
            ) : (
              "Send OTP"
            )}
          </Button>
        )}

        {otpSent && !otpVerified && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-3">
              <Label htmlFor="otp" className="text-gray-700 font-medium">Enter OTP</Label>
              <Input
                id="otp"
                placeholder="Enter 6-digit OTP"
                value={data.otp}
                onChange={(e) => updateData({ otp: e.target.value.replace(/\D/g, '').substring(0, 6) })}
                maxLength={6}
                className="text-center text-2xl tracking-widest h-14 border-gray-200 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
            <Button 
              onClick={verifyOTP} 
              disabled={loading || data.otp.length !== 6}
              className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={sendOTP} 
              disabled={loading}
              className="w-full h-11 border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              Resend OTP
            </Button>
          </div>
        )}

        {otpVerified && (
          <Button 
            onClick={handleNext} 
            className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in"
          >
            Continue to Personal Details →
          </Button>
        )}
      </Card>

      <div className="mt-8 text-center text-sm text-gray-500 space-y-2">
        <div className="flex items-center justify-center">
          <span className="text-xl mr-2">🔒</span>
          <p>Your Aadhaar information is encrypted and secure</p>
        </div>
        <p>Data is processed as per UIDAI guidelines</p>
      </div>
    </div>
  );
};

export default AadhaarAuth;
