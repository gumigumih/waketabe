import { IconButton } from '../atoms/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DishForm } from './DishForm';
import { DishDisplay } from './DishDisplay';
import type { Participant, Dish } from '../../types';

interface DishRowProps {
  dish: Dish;
  participants: Participant[];
  isEditing: boolean;
  editingDish: { name: string; price: string; eaters: string[] };
  onEdit: () => void;
  onDelete: () => void;
  onEditChange: (field: 'name' | 'price' | 'eaters', value: string | string[]) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
}

export const DishRow = ({
  dish,
  participants,
  isEditing,
  editingDish,
  onEdit,
  onDelete,
  onEditChange,
  onEditSave,
  onEditCancel,
}: DishRowProps) => {
  if (isEditing) {
    return (
      <div className="flex items-start md:items-center gap-2 w-full">
        <div className="flex-1">
          <DishForm
            dishName={editingDish.name}
            dishPrice={editingDish.price}
            selectedEaters={editingDish.eaters}
            participants={participants}
            onDishNameChange={(value) => onEditChange('name', value)}
            onDishPriceChange={(value) => onEditChange('price', value)}
            onEatersChange={(eaterIds) => onEditChange('eaters', eaterIds)}
          />
        </div>
          
        <IconButton onClick={onEditSave} className="text-blue-600 hover:text-blue-800" title="保存">
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
        <IconButton onClick={onEditCancel} className="text-gray-500 hover:text-gray-700" title="キャンセル">
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </div>
    );
  }
  return (
    <div className="flex gap-2 w-full">
      <DishDisplay dish={dish} participants={participants} />
      <IconButton onClick={onEdit} className="text-gray-400 hover:text-blue-600" title="編集">
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      <IconButton onClick={onDelete} className="text-gray-400 hover:text-red-500" title="削除">
        <FontAwesomeIcon icon={faTrashAlt} />
      </IconButton>
    </div>
  );
}; 