import { CalculatorInputForm } from '@gumigumih/react-calculator-input-form';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: (value: string | { amount: string; description: string }) => void;
  initialValue?: string;
  initialDishName?: string;
  dishName?: string;
  onDishNameChange?: (name: string) => void;
}

export const Calculator = ({
  isOpen,
  onClose,
  onCalculate,
  initialValue = '',
  initialDishName = '',
  dishName,
  onDishNameChange,
}: CalculatorProps) => {
  const handleCalculate = (value: string) => {
    // 金額のみを更新
    onCalculate(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg w-full max-w-xs shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="font-bold text-lg text-gray-900">
            {dishName ? `${dishName}の入力` : '料理入力'}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>
        
        {/* Dish name input */}
        {onDishNameChange && (
          <div className="px-4 pt-4">
            <input
              type="text"
              value={initialDishName}
              onChange={e => onDishNameChange(e.target.value)}
              placeholder="料理名を入力"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-base mb-2"
              autoFocus
            />
          </div>
        )}
        
        {/* CalculatorInputForm Component */}
        <div className="px-4 pb-4">
          <CalculatorInputForm
            value={initialValue}
            onChange={handleCalculate}
            title={dishName ? `${dishName}の金額を入力` : '料理の金額を入力'}
            description="電卓で簡単計算！税込・税抜や割り勘計算にも対応"
            className="w-full cursor-pointer bg-white rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-base"
            placeholder="金額を入力"
            enableTaxCalculation={true}
            decimalPlaces={0}
            numberFormatOptions={{
              prefix: "¥",
              thousandSeparator: true,
              decimalScale: 0,
              allowNegative: false
            }}
          />
        </div>
      </div>
    </div>
  );
}; 