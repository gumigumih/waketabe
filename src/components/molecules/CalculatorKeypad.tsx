import { Button } from '../atoms/Button';

interface CalculatorKeypadProps {
  onButtonClick: (val: string) => void;
  onEqual: () => void;
  onDecide: () => void;
}

const BUTTONS = [
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '-'],
  ['0', 'C', '←', '+'],
];

export const CalculatorKeypad = ({ onButtonClick, onEqual, onDecide }: CalculatorKeypadProps) => (
  <div className="grid grid-cols-4 gap-2 p-4">
    {BUTTONS.flat().map((btn, i) => (
      <Button
        key={btn + i}
        className="!bg-gray-100 !text-gray-800 hover:!bg-blue-100 py-3 text-lg font-bold"
        onClick={() => onButtonClick(btn)}
        tabIndex={0}
      >
        {btn}
      </Button>
    ))}
    <Button
      className="!bg-blue-500 hover:!bg-blue-600 col-span-2 py-3 text-lg font-bold"
      onClick={onEqual}
    >
      =
    </Button>
    <Button
      className="!bg-lime-500 hover:!bg-lime-600 col-span-2 py-3 text-lg font-bold"
      onClick={onDecide}
    >
      決定
    </Button>
  </div>
); 