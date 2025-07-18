import { useState } from 'react';
import { Button } from '../atoms/Button';
import { TextInput } from '../atoms/TextInput';
import { IconButton } from '../atoms/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: string;
  initialDishName?: string;
  onAmountChange: (amount: string) => void;
  onDishNameChange?: (dishName: string) => void;
}

export const Calculator = ({
  isOpen,
  onClose,
  initialAmount = '',
  initialDishName = '',
  onAmountChange,
  onDishNameChange,
}: CalculatorProps) => {
  const [display, setDisplay] = useState(initialAmount);
  const [dishName, setDishName] = useState(initialDishName);
  const [operation, setOperation] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string>('');

  if (!isOpen) return null;

  const handleNumberClick = (num: string) => {
    if (display === '0' && num !== '.') {
      setDisplay(num);
    } else if (num === '.' && display.includes('.')) {
      return;
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (display !== '') {
      setOperation(op);
      setPreviousValue(display);
      setDisplay('');
    }
  };

  const calculate = () => {
    if (operation && previousValue && display) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(display);
      let result = 0;

      switch (operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '×':
          result = prev * current;
          break;
        case '÷':
          result = prev / current;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setOperation(null);
      setPreviousValue('');
    }
  };

  const clear = () => {
    setDisplay('');
    setOperation(null);
    setPreviousValue('');
  };

  const applyAmount = () => {
    onAmountChange(display);
    if (onDishNameChange) {
      onDishNameChange(dishName);
    }
    onClose();
  };

  const numberButtons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '=']
  ];

  const operationButtons = ['÷', '×', '-', '+'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-[90vw]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">電卓</h3>
          <IconButton onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </div>

        {/* 料理名入力フィールド */}
        {onDishNameChange && (
          <div className="mb-4">
            <TextInput
              type="text"
              placeholder="料理名"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="w-full"
              autoFocus
            />
          </div>
        )}

        {/* 計算結果表示 */}
        <div className="mb-4">
          <div className="bg-gray-100 p-3 rounded text-right text-lg font-mono min-h-[2.5rem] flex items-center justify-end">
            {display || '0'}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* 演算子ボタン */}
          <div className="col-span-1 space-y-2">
            {operationButtons.map((op) => (
              <Button
                key={op}
                onClick={() => handleOperationClick(op)}
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
              >
                {op}
              </Button>
            ))}
          </div>

          {/* 数字ボタン */}
          <div className="col-span-3 space-y-2">
            {numberButtons.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2">
                {row.map((num) => (
                  <Button
                    key={num}
                    onClick={() => num === '=' ? calculate() : handleNumberClick(num)}
                    className={`flex-1 h-12 ${
                      num === '=' 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 mt-4">
          <Button onClick={clear} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
            クリア
          </Button>
          <Button onClick={applyAmount} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
            適用
          </Button>
        </div>
      </div>
    </div>
  );
}; 