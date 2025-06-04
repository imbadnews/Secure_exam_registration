
import React from 'react';

const Header = () => {
  return (
    <div className="text-center animate-fade-in">
      <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-full mb-8 shadow-2xl">
        <span className="text-4xl font-bold text-white drop-shadow-lg">E</span>
        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
        Eduquity Examination Portal
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Secure, Verified & Trusted Examination Registration System
      </p>
      <div className="flex items-center justify-center mt-6 space-x-8 text-sm text-gray-500">
        <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
          <span className="font-medium">Aadhaar Verified</span>
        </div>
        <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
          <span className="font-medium">OTP Secured</span>
        </div>
        <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
          <span className="font-medium">Payment Protected</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
