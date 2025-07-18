import { TextInput } from '../atoms/TextInput';
import { Checkbox } from '../atoms/Checkbox';
import { IconButton } from '../atoms/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Participant {
  id: string;
  name: string;
}

interface Dish {
  id: string;
  name: string;
  price: string;
  eaters: string[];
}

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
          <div className="flex items-start md:items-center gap-2 w-full">
            <TextInput
              type="text"
              className="flex-1"
              value={editingDish.name}
              onChange={e => onEditChange('name', e.target.value)}
              placeholder="料理名"
            />
            <TextInput
              type="number"
              className="w-24"
              value={editingDish.price}
              onChange={e => onEditChange('price', e.target.value)}
              placeholder="金額"
              min={0}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {participants.map(p => (
              <Checkbox
              key={p.id}
              checked={editingDish.eaters.includes(p.id)}
              onChange={e => {
                if (e.target.checked) {
                  onEditChange('eaters', [...editingDish.eaters, p.id]);
                } else {
                  onEditChange('eaters', editingDish.eaters.filter(id => id !== p.id));
                }
              }}
            >
              {p.name}
            </Checkbox>
          ))}
          </div>
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
    <div className="flex  gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <span className="flex-1 text-gray-900">{dish.name}（{dish.price}円）</span>
        <span className="text-sm text-gray-700">{participants.filter(p => dish.eaters.includes(p.id)).map(p => p.name).join(', ')} が食べた</span>
      </div>
      <IconButton onClick={onEdit} className="text-gray-400 hover:text-blue-600" title="編集">
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      <IconButton onClick={onDelete} className="text-gray-400 hover:text-red-500" title="削除">
        <FontAwesomeIcon icon={faTrashAlt} />
      </IconButton>
    </div>
  );
}; 