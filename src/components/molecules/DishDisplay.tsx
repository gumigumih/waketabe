import type { Dish, Participant } from '../../domain/entities';

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
      <div className="flex items-center gap-4 mb-2">
        <div className="font-medium text-lg">{dish.name}</div>
        <div className="text-lg font-semibold text-blue-600">¥{dish.price}</div>
      </div>
      <div className="text-sm text-gray-600">
        食べた人: {eaterNames}
      </div>
    </div>
  );
}; 