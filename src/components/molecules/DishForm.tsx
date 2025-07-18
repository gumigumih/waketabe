import { useState } from 'react';
import { TextInput } from '../atoms/TextInput';
import { Checkbox } from '../atoms/Checkbox';
import { Calculator } from '../organisms/Calculator';
import type { Participant } from '../../types';

interface DishFormProps {
  dishName: string;
  dishPrice: string;
  selectedEaters: string[];
  participants: Participant[];
  onDishNameChange: (value: string) => void;
  onDishPriceChange: (value: string) => void;
  onEatersChange: (eaterIds: string[]) => void;
  className?: string;
}

export const DishForm = ({
  dishName,
  dishPrice,
  selectedEaters,
  participants,
  onDishNameChange,
  onDishPriceChange,
  onEatersChange,
  className = '',
}: DishFormProps) => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleCalculatorClose = () => {
    setIsCalculatorOpen(false);
  };

  const handleCalculatorAmountChange = (amount: string) => {
    onDishPriceChange(amount);
  };

  const handleCalculatorDishNameChange = (name: string) => {
    onDishNameChange(name);
  };

  const handlePriceInputClick = () => {
    setIsCalculatorOpen(true);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-2 w-full">
        <TextInput
          type="text"
          className="flex-1"
          placeholder="料理名"
          value={dishName}
          onChange={e => onDishNameChange(e.target.value)}
        />
        <TextInput
          type="number"
          className="w-32 cursor-pointer"
          placeholder="金額"
          value={dishPrice}
          onChange={e => onDishPriceChange(e.target.value)}
          min={0}
          readOnly
          onClick={handlePriceInputClick}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {participants.map(p => (
          <Checkbox
            key={p.id}
            checked={selectedEaters.includes(p.id)}
            onChange={e => {
              if (e.target.checked) {
                onEatersChange([...selectedEaters, p.id]);
              } else {
                onEatersChange(selectedEaters.filter(id => id !== p.id));
              }
            }}
          >
            {p.name}
          </Checkbox>
        ))}
      </div>

      <Calculator
        isOpen={isCalculatorOpen}
        onClose={handleCalculatorClose}
        initialAmount={dishPrice}
        initialDishName={dishName}
        onAmountChange={handleCalculatorAmountChange}
        onDishNameChange={handleCalculatorDishNameChange}
      />
    </div>
  );
}; 