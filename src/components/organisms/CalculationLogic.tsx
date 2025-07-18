import { useState } from 'react';
import { Button } from '../atoms/Button';
import { calculatePayments, calculateTransfers, formatCurrency } from '../../utils/calculation';
import type { Dish, Participant, CalculationResult } from '../../types';

interface CalculationLogicProps {
  participants: Participant[];
  dishes: Dish[];
  onComplete?: (result: CalculationResult) => void;
}

export const CalculationLogic = ({ participants, dishes, onComplete }: CalculationLogicProps) => {
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [transfers, setTransfers] = useState<Array<{ from: string; to: string; amount: number }>>([]);

  const handleCalculate = () => {
    if (participants.length === 0 || dishes.length === 0) {
      alert('参加者と料理を入力してください');
      return;
    }

    const result = calculatePayments(dishes, participants);
    setCalculationResult(result);

    const transferList = calculateTransfers(result);
    setTransfers(transferList);

    if (onComplete) {
      onComplete(result);
    }
  };

  if (!calculationResult) {
    return (
      <div className="max-w-xl mx-auto bg-white/80 rounded-lg shadow-md p-6 mt-8">
        <div className="text-center text-lg font-semibold text-gray-800 mb-4">
          計算を実行
        </div>
        <div className="text-center text-sm text-gray-600 mb-4">
          参加者: {participants.length}人 | 料理: {dishes.length}品
        </div>
        <Button onClick={handleCalculate} className="w-full">
          計算実行
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/80 rounded-lg shadow-md p-6 mt-8">
      <div className="text-center text-lg font-semibold text-gray-800 mb-6">
        計算結果
      </div>

      {/* 概要 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">総額</div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(calculationResult.totalAmount)}円
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">参加者数</div>
          <div className="text-2xl font-bold text-green-600">
            {participants.length}人
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600">一人当たり</div>
          <div className="text-2xl font-bold text-purple-600">
            {formatCurrency(calculationResult.averageAmount)}円
          </div>
        </div>
      </div>

      {/* 参加者ごとの詳細 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">参加者ごとの詳細</h3>
        <div className="space-y-3">
          {calculationResult.participants.map(participant => (
            <div key={participant.participantId} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{participant.participantName}</span>
                <span className={`font-bold ${
                  participant.netAmount > 0 ? 'text-green-600' : 
                  participant.netAmount < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {participant.netAmount > 0 ? '+' : ''}{formatCurrency(participant.netAmount)}円
                </span>
              </div>
              <div className="text-sm text-gray-600">
                支払うべき金額: {formatCurrency(participant.totalOwed)}円
              </div>
              {participant.dishes.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">食べた料理:</div>
                  <div className="text-xs text-gray-600">
                    {participant.dishes.map(dish => (
                      <span key={dish.dishId} className="inline-block bg-white px-2 py-1 rounded mr-1 mb-1">
                        {dish.dishName} ({formatCurrency(dish.contribution)}円)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 送金方法 */}
      {transfers.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">最適な送金方法</h3>
          <div className="space-y-2">
            {transfers.map((transfer, index) => (
              <div key={index} className="bg-yellow-50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-gray-800">
                  <span className="font-semibold">{transfer.from}</span>
                  <span className="mx-2">→</span>
                  <span className="font-semibold">{transfer.to}</span>
                </span>
                <span className="font-bold text-yellow-700">
                  {formatCurrency(transfer.amount)}円
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 再計算ボタン */}
      <Button 
        onClick={() => {
          setCalculationResult(null);
          setTransfers([]);
        }} 
        className="w-full bg-gray-500 hover:bg-gray-700"
      >
        再計算
      </Button>
    </div>
  );
}; 