import { Calculator } from '../organisms/Calculator';
import { useState } from 'react';
import { TextInput } from '../atoms/TextInput';

interface SimplePaymentInputProps {
  value: string;
  onChange: (value: string) => void;
  savePayment: (personId: string, paymentId: string, amount: number | string, description?: string) => void;
  personId: string;
  personName?: string;
}

export const SimplePaymentInput = ({
  value,
  onChange,
  savePayment,
  personId,
  personName,
}: SimplePaymentInputProps) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleCalculatorResult = (result: string | { amount: string; description: string }) => {
    let amountStr = '';
    if (typeof result === 'string') {
      amountStr = result;
    } else {
      amountStr = result.amount;
    }
    onChange(amountStr);
    const amount = Number(amountStr.replace(/,/g, '')) || 0;
    savePayment(personId, '', amount);
  };

  return (
    <div className="relative flex-1 min-w-0">
      <TextInput
        className="w-full pr-8"
        value={value}
        placeholder="金額"
        onFocus={() => setIsCalculatorOpen(true)}
        readOnly
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">円</span>
      <Calculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onCalculate={handleCalculatorResult}
        initialValue={value}
        personName={personName}
        isDetailMode={false}
      />
    </div>
  );
}; 