import type { DishContribution } from './DishContribution';

export interface ParticipantPayment {
  participantId: string;
  participantName: string;
  totalPaid: number;
  totalOwed: number;
  netAmount: number; // 支払うべき金額（負の値）または受け取るべき金額（正の値）
  dishes: DishContribution[];
} 