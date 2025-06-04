
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { RegistrationData } from '../RegistrationSystem';

interface PaymentSectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PaymentSection = ({ data, updateData, onNext, onPrev }: PaymentSectionProps) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast({
          title: "Card Details Required",
          description: "Please fill all card details",
          variant: "destructive"
        });
        return;
      }
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updateData({ paymentStatus: 'completed' });
      setProcessing(false);
      toast({
        title: "Payment Successful",
        description: `₹${data.fees} paid successfully`,
      });
      onNext();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.substring(0, 2) + '/' + numbers.substring(2, 4);
    }
    return numbers;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment</h2>
        <p className="text-gray-600">Secure payment processing</p>
      </div>

      <div className="space-y-6">
        {/* Payment Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Registration Fee</span>
              <span>₹{data.fees}</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee</span>
              <span>₹{Math.round(data.fees * 0.02)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{Math.round((data.fees + data.fees * 0.02) * 0.18)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{Math.round((data.fees + data.fees * 0.02) * 1.18)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
          
          <div className="space-y-4">
            <Label>Select Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="upi">UPI Payment</SelectItem>
                <SelectItem value="netbanking">Net Banking</SelectItem>
                <SelectItem value="wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>

            {paymentMethod === 'card' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Name as on card"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').substring(0, 3) }))}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@paytm"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-4 animate-fade-in">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </Card>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">🔒 Secure Payment</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• 256-bit SSL encryption</li>
            <li>• PCI DSS compliant payment gateway</li>
            <li>• Your card details are not stored</li>
            <li>• Instant payment confirmation</li>
          </ul>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={onPrev} className="flex-1" disabled={processing}>
            Back
          </Button>
          <Button onClick={handlePayment} className="flex-1" disabled={processing}>
            {processing ? "Processing Payment..." : `Pay ₹${Math.round((data.fees + data.fees * 0.02) * 1.18)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
