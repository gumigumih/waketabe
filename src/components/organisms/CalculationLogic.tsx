import { useState } from 'react';
import { Button } from '../atoms/Button';
import { calculatePayments, calculateTransfers, formatCurrency } from '../../domain/usecases';
import type { Dish, Participant, CalculationResult } from '../../domain/entities';

interface CalculationLogicProps {
  dishes: Dish[];
  participants: Participant[];
  onResult: (result: CalculationResult) => void;
}

export const CalculationLogic = ({ dishes, participants, onResult }: CalculationLogicProps) => {
  const [isCalculated, setIsCalculated] = useState(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    if (dishes.length === 0 || participants.length === 0) return;

    const result = calculatePayments(dishes, participants);
    setCalculationResult(result);
    setIsCalculated(true);
    onResult(result);
  };

  const handleReset = () => {
    setIsCalculated(false);
    setCalculationResult(null);
  };

  if (!isCalculated) {
    return (
      <div className="max-w-xl mx-auto bg-white/80 rounded-lg shadow-md p-6 mt-8">
        <div className="text-center text-lg font-semibold text-gray-800 mb-4">
          計算を実行してください
        </div>
        <Button onClick={handleCalculate} className="w-full">
          計算実行
        </Button>
      </div>
    );
  }

  if (!calculationResult) return null;

  const transferList = calculateTransfers(calculationResult);

  return (
    <div className="max-w-xl mx-auto bg-white/80 rounded-lg shadow-md p-6 mt-8">
      <div className="text-center text-lg font-semibold text-gray-800 mb-4">
        計算結果
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              ¥{formatCurrency(calculationResult.totalAmount)}
            </div>
            <div className="text-sm text-gray-600">総額</div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              ¥{formatCurrency(calculationResult.averageAmount)}
            </div>
            <div className="text-sm text-gray-600">一人当たり</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">参加者別の支払い状況</h3>
          {calculationResult.participants.map(participant => (
            <div key={participant.participantId} className="bg-gray-50 p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">{participant.participantName}</span>
                <span className={`font-bold ${
                  participant.netAmount > 0 ? 'text-green-600' : 
                  participant.netAmount < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {participant.netAmount > 0 ? '+' : ''}¥{formatCurrency(participant.netAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {transferList.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">送金方法</h3>
            {transferList.map((transfer, index) => (
              <div key={index} className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                <div className="text-sm text-gray-600">
                  {transfer.from} → {transfer.to}
                </div>
                <div className="font-bold text-yellow-700">
                  ¥{formatCurrency(transfer.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        className="mt-6 w-full bg-gray-500 hover:bg-gray-700"
        onClick={handleReset}
      >
        リセット
      </Button>
    </div>
  );
}; 