
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { RegistrationData } from '../RegistrationSystem';

interface ExamDetailsProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ExamDetails = ({ data, updateData, onNext, onPrev }: ExamDetailsProps) => {
  const examTypes = [
    { value: 'jee-main', label: 'JEE Main 2024', fees: 850 },
    { value: 'neet', label: 'NEET 2024', fees: 1600 },
    { value: 'gate', label: 'GATE 2024', fees: 1800 },
    { value: 'cat', label: 'CAT 2024', fees: 2300 },
    { value: 'upsc-prelims', label: 'UPSC Prelims 2024', fees: 200 },
  ];

  const examCenters = [
    { value: 'delhi-01', label: 'Delhi - Connaught Place Center', city: 'Delhi' },
    { value: 'delhi-02', label: 'Delhi - Karol Bagh Center', city: 'Delhi' },
    { value: 'mumbai-01', label: 'Mumbai - Andheri Center', city: 'Mumbai' },
    { value: 'mumbai-02', label: 'Mumbai - Bandra Center', city: 'Mumbai' },
    { value: 'bangalore-01', label: 'Bangalore - Koramangala Center', city: 'Bangalore' },
    { value: 'bangalore-02', label: 'Bangalore - Whitefield Center', city: 'Bangalore' },
    { value: 'chennai-01', label: 'Chennai - T. Nagar Center', city: 'Chennai' },
    { value: 'kolkata-01', label: 'Kolkata - Salt Lake Center', city: 'Kolkata' },
    { value: 'pune-01', label: 'Pune - FC Road Center', city: 'Pune' },
    { value: 'hyderabad-01', label: 'Hyderabad - HITEC City Center', city: 'Hyderabad' },
  ];

  const handleExamTypeChange = (value: string) => {
    const selectedExam = examTypes.find(exam => exam.value === value);
    updateData({ 
      examType: value,
      fees: selectedExam?.fees || 0
    });
  };

  const validateForm = () => {
    if (!data.examType) {
      toast({
        title: "Exam Type Required",
        description: "Please select an exam type",
        variant: "destructive"
      });
      return false;
    }

    if (!data.examCenter) {
      toast({
        title: "Exam Center Required",
        description: "Please select your preferred exam center",
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

  const selectedExam = examTypes.find(exam => exam.value === data.examType);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Details</h2>
        <p className="text-gray-600">Select your exam type and preferred center</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="examType">Select Exam Type *</Label>
            <Select value={data.examType} onValueChange={handleExamTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your exam" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((exam) => (
                  <SelectItem key={exam.value} value={exam.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{exam.label}</span>
                      <span className="ml-4 font-semibold text-green-600">₹{exam.fees}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExam && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
              <h3 className="font-semibold text-blue-800 mb-2">Selected Exam Details</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Exam:</strong> {selectedExam.label}</p>
                <p><strong>Registration Fee:</strong> ₹{selectedExam.fees}</p>
                <p><strong>Mode:</strong> Computer Based Test (CBT)</p>
                <p><strong>Duration:</strong> 3 hours</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="examCenter">Preferred Exam Center *</Label>
            <Select value={data.examCenter} onValueChange={(value) => updateData({ examCenter: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your preferred center" />
              </SelectTrigger>
              <SelectContent>
                {examCenters.map((center) => (
                  <SelectItem key={center.value} value={center.value}>
                    <div className="flex flex-col items-start">
                      <span>{center.label}</span>
                      <span className="text-xs text-gray-500">{center.city}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {data.examCenter && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <h3 className="font-semibold text-green-800 mb-2">Selected Center Information</h3>
              <div className="text-sm text-green-700">
                <p><strong>Center:</strong> {examCenters.find(c => c.value === data.examCenter)?.label}</p>
                <p><strong>Facilities:</strong> AC Rooms, CCTV Monitoring, Secure Lockers</p>
                <p><strong>Accessibility:</strong> Wheelchair accessible, Public transport nearby</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">📍 Important Instructions</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Center allocation is subject to availability</li>
            <li>• You can change your center up to 7 days before exam</li>
            <li>• Arrive at center 30 minutes before exam time</li>
            <li>• Carry valid ID proof and admit card</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1">
            Back
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Proceed to Payment
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ExamDetails;
