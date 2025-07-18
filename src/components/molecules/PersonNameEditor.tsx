import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from '../atoms/TextInput';
import { IconButton } from '../atoms/IconButton';

interface PersonNameEditorProps {
  personId: string;
  name: string;
  onUpdateName?: (personId: string, newName: string) => void;
  onDeletePerson: (personId: string) => void;
}

export const PersonNameEditor = ({ personId, name, onUpdateName, onDeletePerson }: PersonNameEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  if (isEditing) {
    return (
      <div className="flex w-full items-center gap-2">
        <TextInput
          type="text"
          value={editedName.replace(/さん$/, '')}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              const newName = editedName.endsWith('さん') ? editedName : `${editedName}さん`;
              if (onUpdateName) { onUpdateName(personId, newName); }
              setIsEditing(false);
            } else if (e.key === 'Escape') {
              e.preventDefault();
              setIsEditing(false);
              setEditedName(name);
            }
          }}
          className="flex-1 text-lg font-medium text-gray-900"
          autoFocus
        />
        <IconButton
          onClick={() => {
            const newName = editedName.endsWith('さん') ? editedName : `${editedName}さん`;
            if (onUpdateName) { onUpdateName(personId, newName); }
            setIsEditing(false);
          }}
          className="text-blue-600 hover:text-blue-700"
          title="保存"
        >
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
        <IconButton
          onClick={() => {
            setIsEditing(false);
            setEditedName(name);
          }}
          className="text-gray-600 hover:text-gray-700"
          title="キャンセル"
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <h3 className="flex-1 text-lg font-bold text-gray-900">{name}</h3>
      <IconButton
        onClick={() => setIsEditing(true)}
        className="text-gray-400 hover:text-gray-500"
        title="編集"
      >
        <FontAwesomeIcon icon={faPen} />
      </IconButton>
      <IconButton
        onClick={() => {
          if (window.confirm('この参加者を削除してもよろしいですか？')) {
            onDeletePerson(personId);
          }
        }}
        className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
        title="人物を削除"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </IconButton>
    </div>
  );
}; 