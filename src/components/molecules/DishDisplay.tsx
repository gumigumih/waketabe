import type { Dish, Participant } from '../../domain/types';

interface DishDisplayProps {
  dish: Dish;
  participants: Participant[];
}

export const DishDisplay = ({ dish, participants }: DishDisplayProps) => {
  const eaterNames = participants
    .filter(p => dish.eaters.includes(p.id))
    .map(p => p.name)
    .join(', ');

  return (
    <div className="flex-1">
      <div className="font-medium">{dish.name}</div>
      <div className="text-sm text-gray-600">
        ¥{dish.price} - {eaterNames}
      </div>
    </div>
  );
}; 