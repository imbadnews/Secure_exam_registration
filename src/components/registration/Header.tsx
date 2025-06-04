
import React from 'react';

const Header = () => {
  return (
    <div className="text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-6 shadow-lg">
        <span className="text-3xl font-bold text-white">E</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Eduquity Examination Portal
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Secure, Verified & Trusted Examination Registration System
      </p>
      <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Aadhaar Verified
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          OTP Secured
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
          Payment Protected
        </div>
      </div>
    </div>
  );
};

export default Header;
