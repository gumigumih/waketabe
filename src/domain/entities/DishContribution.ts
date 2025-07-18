export interface DishContribution {
  dishId: string;
  dishName: string;
  dishPrice: number;
  contribution: number; // この料理で支払うべき金額
} 