export interface Payment {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
}

export interface Participant {
  id: string;
  name: string;
}

export interface PaymentItem {
  id: string;
  description: string;
  amount: number;
}

export interface Person {
  id: string;
  name: string;
  payments: PaymentItem[];
}

export interface PeopleState {
  people: Person[];
  isDetailMode: boolean;
  nonPayingParticipants: number;
}

export interface Dish {
  id: string;
  name: string;
  price: string;
  eaters: string[];
}

export interface CalculationResult {
  participants: ParticipantPayment[];
  totalAmount: number;
  averageAmount: number;
}

export interface ParticipantPayment {
  participantId: string;
  participantName: string;
  totalPaid: number;
  totalOwed: number;
  netAmount: number; // 支払うべき金額（負の値）または受け取るべき金額（正の値）
  dishes: DishContribution[];
}

export interface DishContribution {
  dishId: string;
  dishName: string;
  dishPrice: number;
  contribution: number; // この料理で支払うべき金額
} 