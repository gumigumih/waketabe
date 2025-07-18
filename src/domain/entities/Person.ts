export interface Person {
  id: string;
  name: string;
  payments: PaymentItem[];
}

export interface PaymentItem {
  id: string;
  amount: number;
  description: string;
} 