import type { Participant, Dish } from '../../types';

interface DishDisplayProps {
  dish: Dish;
  participants: Participant[];
  className?: string;
}

export const DishDisplay = ({ dish, participants, className = '' }: DishDisplayProps) => {
  const eaterNames = participants
    .filter(p => dish.eaters.includes(p.id))
    .map(p => p.name)
    .join(', ');

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <span className="flex-1 text-gray-900">{dish.name}（{dish.price}円）</span>
      <span className="text-sm text-gray-700">{eaterNames} が食べた</span>
    </div>
  );
}; 