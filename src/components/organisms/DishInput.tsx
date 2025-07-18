import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../atoms/Button';
import { DishRow } from '../molecules/DishRow';
import { DishForm } from '../molecules/DishForm';
import type { Participant, Dish } from '../../domain/entities';

export const DishInput = ({ participants, onComplete, onBack, initialDishes = [] }: { 
  participants: Participant[]; 
  onComplete?: (dishes: Dish[]) => void;
  onBack?: () => void;
  initialDishes?: Dish[];
}) => {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [selectedEaters, setSelectedEaters] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDish, setEditingDish] = useState<{ name: string; price: string; eaters: string[] }>({ name: '', price: '', eaters: [] });

  const resetInput = () => {
    setDishName('');
    setDishPrice('');
    setSelectedEaters([]);
  };

  const handleAdd = () => {
    if (!dishName.trim() || !dishPrice.trim() || selectedEaters.length === 0) return;
    setDishes([
      ...dishes,
      { id: crypto.randomUUID(), name: dishName.trim(), price: dishPrice.trim(), eaters: [...selectedEaters] },
    ]);
    resetInput();
  };

  const handleDelete = (id: string) => {
    setDishes(dishes.filter(d => d.id !== id));
  };

  const handleEdit = (dish: Dish) => {
    setEditingId(dish.id);
    setEditingDish({ name: dish.name, price: dish.price, eaters: [...dish.eaters] });
  };

  const handleEditChange = (field: 'name' | 'price' | 'eaters', value: string | string[]) => {
    setEditingDish(ed => ({ ...ed, [field]: value }));
  };

  const handleEditSave = (id: string) => {
    setDishes(dishes.map(d => d.id === id ? { ...d, ...editingDish } : d));
    setEditingId(null);
    setEditingDish({ name: '', price: '', eaters: [] });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingDish({ name: '', price: '', eaters: [] });
  };

  return (
    <>
      {onBack && (
        <div className="flex justify-start mb-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            戻る
          </button>
        </div>
      )}
      <div className="max-w-xl mx-auto bg-white/80 rounded-lg shadow-md p-6 mt-8">
        <div className="text-center text-lg font-semibold text-gray-800 mb-4">
          料理名・金額・食べた人を入力してください
        </div>
        <form
          className="flex flex-col gap-2 mb-4"
          onSubmit={e => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <DishForm
            dishName={dishName}
            dishPrice={dishPrice}
            selectedEaters={selectedEaters}
            participants={participants}
            onDishNameChange={setDishName}
            onDishPriceChange={setDishPrice}
            onEatersChange={setSelectedEaters}
          />
          <Button type="submit" className="w-full">
            追加
          </Button>
        </form>
        <ul className="space-y-2">
          {dishes.map(d => (
            <li key={d.id}>
              <DishRow
                dish={d}
                participants={participants}
                isEditing={editingId === d.id}
                editingDish={editingDish}
                onEdit={() => handleEdit(d)}
                onDelete={() => handleDelete(d.id)}
                onEditChange={handleEditChange}
                onEditSave={() => handleEditSave(d.id)}
                onEditCancel={handleEditCancel}
              />
            </li>
          ))}
        </ul>
      </div>
      {onComplete && (
        <Button
          className="mt-6 w-full bg-red-500 hover:bg-red-700 font-bold text-lg"
          onClick={() => onComplete(dishes)}
          disabled={dishes.length === 0}
        >
          次へ
        </Button>
      )}
    </>
  );
}; 