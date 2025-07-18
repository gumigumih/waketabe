import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../atoms/Icon';
import { CalculatorDisplay } from '../molecules/CalculatorDisplay';
import { CalculatorKeypad } from '../molecules/CalculatorKeypad';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: (value: string | { amount: string; dishName: string }) => void;
  initialValue?: string;
  initialDishName?: string;
  dishName?: string;
  isDetailMode?: boolean;
  onDishNameChange?: (name: string) => void;
}

function formatNumber(value: string) {
  if (!value) return '';
  return value.replace(/\d+(?=(?:[^\d]*\d)*$)/g, (num) => Number(num).toLocaleString());
}

function calculateExpression(expr: string): string {
  try {
    const sanitized = expr.replace(/,/g, '').replace(/×/g, '*').replace(/÷/g, '/');
    // eslint-disable-next-line no-eval
    const result = eval(sanitized);
    if (isNaN(result) || !isFinite(result)) return '0';
    return String(Math.round(result));
  } catch {
    return '0';
  }
}

export const Calculator = ({
  isOpen,
  onClose,
  onCalculate,
  initialValue = '',
  initialDishName = '',
  dishName,
  isDetailMode,
  onDishNameChange,
}: CalculatorProps) => {
  const [input, setInput] = useState(initialValue || '');
  const [dishNameInput, setDishNameInput] = useState(initialDishName || '');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInput(initialValue || '');
      setDishNameInput(initialDishName || '');
      setError('');
    }
  }, [isOpen, initialValue, initialDishName]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key);
        e.preventDefault();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleButtonClick(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
        e.preventDefault();
      } else if (e.key === 'Backspace') {
        handleButtonClick('←');
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === '=') {
        handleDecide();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
      } else if (e.key === 'c' || e.key === 'C') {
        handleButtonClick('C');
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, input, dishNameInput]);

  const handleButtonClick = (val: string) => {
    setError('');
    if (val === 'C') {
      setInput('');
    } else if (val === '←') {
      setInput((prev) => prev.slice(0, -1));
    } else if (['+', '-', '×', '÷'].includes(val)) {
      if (!input || /[+\-×÷]$/.test(input)) return;
      setInput((prev) => prev + val);
    } else {
      setInput((prev) => (prev === '0' ? val : prev + val));
    }
  };

  const handleEqual = () => {
    if (!input) return;
    const result = calculateExpression(input);
    setInput(result);
  };

  const handleDecide = () => {
    if (!input) {
      setError('金額を入力してください');
      return;
    }
    const result = calculateExpression(input);
    if (onDishNameChange) {
      onCalculate({ amount: result, dishName: dishNameInput });
    } else {
      onCalculate(result);
    }
    onClose();
  };

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg w-full max-w-xs shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="font-bold text-lg text-gray-900">
            {dishName ? `${dishName}の入力` : '料理入力'}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Icon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>
        {/* Dish name input */}
        {onDishNameChange && (
          <div className="px-4 pt-4">
            <input
              type="text"
              value={dishNameInput}
              onChange={e => setDishNameInput(e.target.value)}
              placeholder="料理名を入力"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-base mb-2"
              autoFocus
            />
          </div>
        )}
        {/* Display */}
        <CalculatorDisplay value={formatNumber(input)} error={error} inputRef={inputRef} />
        {/* Buttons */}
        <CalculatorKeypad
          onButtonClick={handleButtonClick}
          onEqual={handleEqual}
          onDecide={handleDecide}
        />
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}; 