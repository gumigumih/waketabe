import type { Dish, Participant, CalculationResult, ParticipantPayment, Transfer } from './types';

/**
 * 料理と参加者の情報から一人当たりの金額を計算する
 * @param dishes 料理の配列
 * @param participants 参加者の配列
 * @returns 計算結果
 */
export const calculatePayments = (
  dishes: Dish[],
  participants: Participant[]
): CalculationResult => {
  // 参加者ごとの支払い情報を初期化
  const participantPayments: ParticipantPayment[] = participants.map(p => ({
    participantId: p.id,
    participantName: p.name,
    totalPaid: 0,
    totalOwed: 0,
    netAmount: 0,
    dishes: []
  }));

  let totalAmount = 0;

  // 各料理について計算
  dishes.forEach(dish => {
    const dishPrice = parseInt(dish.price, 10);
    if (isNaN(dishPrice) || dishPrice <= 0) return;

    totalAmount += dishPrice;
    const eaterCount = dish.eaters.length;
    
    if (eaterCount === 0) return;

    const amountPerPerson = dishPrice / eaterCount;

    // 食べた人ごとに金額を分配
    dish.eaters.forEach(eaterId => {
      const participantPayment = participantPayments.find(p => p.participantId === eaterId);
      if (!participantPayment) return;

      participantPayment.totalOwed += amountPerPerson;
      
      // 料理ごとの貢献を記録
      participantPayment.dishes.push({
        dishId: dish.id,
        dishName: dish.name,
        dishPrice: dishPrice,
        contribution: amountPerPerson
      });
    });
  });

  // 平均金額を計算
  const averageAmount = participants.length > 0 ? totalAmount / participants.length : 0;

  // 純支払い金額を計算（支払った金額 - 支払うべき金額）
  participantPayments.forEach(payment => {
    payment.netAmount = payment.totalPaid - payment.totalOwed;
  });

  return {
    participants: participantPayments,
    totalAmount,
    averageAmount
  };
};

/**
 * 最適な送金方法を計算する（簡易版）
 * @param calculationResult 計算結果
 * @returns 送金リスト
 */
export const calculateTransfers = (calculationResult: CalculationResult): Transfer[] => {
  const { participants } = calculationResult;
  
  // 支払うべき人（負の値）と受け取るべき人（正の値）に分ける
  const debtors = participants.filter(p => p.netAmount < 0).sort((a, b) => a.netAmount - b.netAmount);
  const creditors = participants.filter(p => p.netAmount > 0).sort((a, b) => b.netAmount - a.netAmount);

  const transfers: Transfer[] = [];

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const debtor = debtors[debtorIndex];
    const creditor = creditors[creditorIndex];

    const transferAmount = Math.min(
      Math.abs(debtor.netAmount),
      creditor.netAmount
    );

    if (transferAmount > 0) {
      transfers.push({
        from: debtor.participantName,
        to: creditor.participantName,
        amount: transferAmount
      });
    }

    // 残額を更新
    debtor.netAmount += transferAmount;
    creditor.netAmount -= transferAmount;

    // 支払い完了した参加者を次のインデックスに移動
    if (Math.abs(debtor.netAmount) < 0.01) debtorIndex++;
    if (creditor.netAmount < 0.01) creditorIndex++;
  }

  return transfers;
};

/**
 * 金額を日本円形式でフォーマットする
 * @param amount 金額
 * @returns フォーマットされた金額文字列
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP').format(Math.round(amount));
}; 