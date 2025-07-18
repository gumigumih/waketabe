import { useState } from 'react';
import { TextInput } from '../atoms/TextInput';
import { Checkbox } from '../atoms/Checkbox';
import { Button } from '../atoms/Button';
import { DishRow } from '../molecules/DishRow';

interface Participant {
  id: string;
  name: string;
}

interface Dish {
  id: string;
  name: string;
  price: string;
  eaters: string[]; // 参加者idの配列
}

export const DishInput = ({ participants, onComplete }: { participants: Participant[]; onComplete?: (dishes: Dish[]) => void }) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
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
          <div className="flex gap-2 w-full">
            <TextInput
              type="text"
              className="flex-1"
              placeholder="料理名"
              value={dishName}
              onChange={e => setDishName(e.target.value)}
            />
            <TextInput
              type="number"
              className="w-32"
              placeholder="金額"
              value={dishPrice}
              onChange={e => setDishPrice(e.target.value)}
              min={0}
            />
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            {participants.map(p => (
              <Checkbox
                key={p.id}
                checked={selectedEaters.includes(p.id)}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedEaters([...selectedEaters, p.id]);
                  } else {
                    setSelectedEaters(selectedEaters.filter(id => id !== p.id));
                  }
                }}
              >
                {p.name}
              </Checkbox>
            ))}
          </div>
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