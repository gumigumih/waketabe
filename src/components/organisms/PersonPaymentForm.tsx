import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import type { Person, PaymentItem } from '../../domain/entities';
import type { AppDispatch } from '../../store/store';
import { addPayment, updatePayment, updateSimplePayment } from '../../store/peopleSlice';
import { PersonNameEditor } from '../molecules/PersonNameEditor';
import { PaymentRow } from '../molecules/PaymentRow';
import { SimplePaymentInput } from '../molecules/SimplePaymentInput';
import { Button } from '../atoms/Button';

interface PersonPaymentFormProps {
  person: Person;
  onDeletePerson: (personId: string) => void;
  dispatch: AppDispatch;
  isDetailMode: boolean;
}

export const PersonPaymentForm = ({ person, onDeletePerson, dispatch, isDetailMode }: PersonPaymentFormProps) => {
  const [inputRows, setInputRows] = useState<{ id: string; amount: string; description: string }[]>([]);
  const [simpleTotal, setSimpleTotal] = useState('');

  // 統一された保存関数
  const savePayment = (personId: string, paymentId: string, amount: number | string, description?: string) => {
    if (isDetailMode) {
      const numericAmount = typeof amount === 'string' ? Number(amount.replace(/,/g, '')) || 0 : amount;
      dispatch(updatePayment({
        personId,
        paymentId,
        payment: {
          amount: numericAmount,
          description: description || '',
        }
      }));
    } else {
      if (amount) {
        const numericAmount = typeof amount === 'string' ? Number(amount.replace(/,/g, '')) || 0 : amount;
        dispatch(updateSimplePayment({
          personId,
          amount: numericAmount,
        }));
      }
    }
  };

  const handleSavePayment = (personId: string, paymentId: string, amount: number, description: string) => {
    dispatch(updatePayment({
      personId,
      paymentId,
      payment: {
        amount,
        description,
      }
    }));
  };

  // ストアの状態と入力フォームの状態を同期
  useEffect(() => {
    if (isDetailMode) {
      // 詳細モードの場合、支払い情報を入力行に反映
      const newRows = person.payments.map((payment: PaymentItem) => ({
        id: payment.id,
        amount: String(payment.amount),
        description: payment.description,
      }));
      setInputRows(newRows);
    } else {
      // シンプルモードの場合、合計額を反映
      const total = person.payments.reduce((sum: number, payment: PaymentItem) => sum + payment.amount, 0);
      setSimpleTotal(String(total));
    }
  }, [person.payments, isDetailMode, person.id]);

  const handleAddRow = () => {
    const newId = crypto.randomUUID();
    const newRow = { id: newId, amount: '', description: '' };
    setInputRows([...inputRows, newRow]);
    // 新しい行を追加する際にストアにも追加
    dispatch(addPayment({
      personId: person.id,
      payment: {
        amount: 0,
        description: '',
      }
    }));
  };

  return (
    <div className="space-y-4" data-person-id={person.id}>
      <div className="flex items-center gap-2 pb-2">
        <PersonNameEditor
          personId={person.id}
          name={person.name}
          onUpdateName={(id, newName) => dispatch({ type: 'updatePersonName', payload: { personId: id, newName } })}
          onDeletePerson={onDeletePerson}
        />
      </div>
      <div className="space-y-2">
        {isDetailMode ? (
          <>
            {inputRows.map((row, index) => (
              <PaymentRow
                key={row.id}
                row={row}
                index={index}
                personId={person.id}
                personName={person.name}
                dispatch={dispatch}
                onAmountChange={(_index, value) => {
                  const amount = Number(value.replace(/,/g, '')) || 0;
                  savePayment(person.id, row.id, amount, row.description);
                }}
                onDescriptionChange={(_index, value) => {
                  const amount = Number(row.amount.replace(/,/g, '')) || 0;
                  savePayment(person.id, row.id, amount, value);
                }}
                savePayment={handleSavePayment}
              />
            ))}
            <Button
              onClick={handleAddRow}
              className="w-full bg-gray-600 hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              行追加
            </Button>
          </>
        ) : (
          <SimplePaymentInput
            value={simpleTotal}
            onChange={setSimpleTotal}
            savePayment={savePayment}
            personId={person.id}
            personName={person.name}
          />
        )}
      </div>
    </div>
  );
}; 