import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Calculator } from '../organisms/Calculator';
import { useState } from 'react';
import { TextInput } from '../atoms/TextInput';
import { IconButton } from '../atoms/IconButton';

interface PaymentRowProps {
  row: { id: string; amount: string; description: string };
  index: number;
  personId: string;
  dispatch: any;
  onAmountChange: (index: number, value: string) => void;
  onDescriptionChange: (index: number, value: string) => void;
  savePayment: (personId: string, paymentId: string, amount: number, description: string) => void;
  personName?: string;
}

export const PaymentRow = ({
  row,
  index,
  personId,
  dispatch,
  onAmountChange,
  onDescriptionChange,
  savePayment,
  personName,
}: PaymentRowProps) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleCalculatorResult = (result: string | { amount: string; description: string }) => {
    if (typeof result === 'string') {
      onAmountChange(index, result);
      if (row.id) {
        const amount = Number(result.replace(/,/g, '')) || 0;
        savePayment(personId, row.id, amount, row.description);
      }
    } else {
      onAmountChange(index, result.amount);
      onDescriptionChange(index, result.description);
      if (row.id) {
        const amount = Number(result.amount.replace(/,/g, '')) || 0;
        savePayment(personId, row.id, amount, result.description);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <div className="relative flex-1 min-w-0">
        <TextInput
          className="w-full pr-8"
          value={row.amount}
          placeholder="金額"
          onFocus={() => setIsCalculatorOpen(true)}
          readOnly
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">円</span>
        <Calculator
          isOpen={isCalculatorOpen}
          onClose={() => setIsCalculatorOpen(false)}
          onCalculate={handleCalculatorResult}
          initialValue={row.amount}
          initialDescription={row.description}
          personName={personName}
          isDetailMode={true}
        />
      </div>
      <div className="relative flex-1 min-w-0">
        <TextInput
          className="w-full"
          value={row.description}
          placeholder="項目名"
          onFocus={() => setIsCalculatorOpen(true)}
          readOnly
        />
      </div>
      {row.id && (
        <IconButton
          onClick={() => {
            if (window.confirm('この項目を削除してもよろしいですか？')) {
              dispatch({ type: 'deletePayment', payload: { personId, paymentId: row.id } });
            }
          }}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="項目を削除"
        >
          <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
        </IconButton>
      )}
    </div>
  );
}; 