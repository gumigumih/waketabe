export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP').format(Math.round(amount)) + '円';
}; 