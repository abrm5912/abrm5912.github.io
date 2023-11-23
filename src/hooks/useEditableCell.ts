import { ChangeEvent, RefObject, useContext, useEffect, useState } from 'react';
import { InputRef } from 'antd';
import { EditableContext } from '../constants/context';

export function useEditableCell<T>(dataIndex: keyof T,
                                   record: T,
                                   inputRef: RefObject<InputRef>,
                                   handleSave: (record: T) => void) {
  const form = useContext(EditableContext)!;

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isFieldValid, setIsFieldValid] = useState(true);

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  useEffect(() => {
    form.validateFields().then(() => {
      setIsFieldValid(form.getFieldError(dataIndex).length === 0);
    }).catch(() => {
      setIsFieldValid(form.getFieldError(dataIndex).length === 0);
    });
  }, [inputValue]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.info('Save failed:', errInfo);
    }
  };

  const reset = () => {
    toggleEdit();
  };

  return {
    editing,
    inputValue,
    isFieldValid,
    save,
    reset,
    toggleEdit,
    handleInput
  };
}
