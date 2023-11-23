import React, { useRef } from 'react';
import { Form, Input, InputRef, FormRule } from 'antd';
import { useEditableCell } from '../../../hooks/useEditableCell';
import { ReactComponent as Edit } from '../../../assets/img/edit.svg';
import { ReactComponent as CheckMark } from '../../../assets/img/check-mark.svg';
import { ReactComponent as Cross } from '../../../assets/img/cross.svg';
import './EditableCell.css';

export interface Item {
  key: string;
  currency: string;
  buy: number;
  sale: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
                                                            title,
                                                            editable,
                                                            children,
                                                            dataIndex,
                                                            record,
                                                            handleSave,
                                                            ...restProps
                                                          }) => {
  const inputRef = useRef<InputRef>(null);

  const {
    editing,
    inputValue,
    isFieldValid,
    save,
    reset,
    toggleEdit,
    handleInput
  } = useEditableCell<Item>(dataIndex, record, inputRef, handleSave);

  const exchangeCellRules: FormRule[] = [
    {
      required: true,
      message: `${title} is required.`,
    },
    {
      pattern: /^-?\d+(\.+\d+)?$/,
      message: 'The value must be number'
    },
    {
      validator: (_, value) => {
        const initialValue = +record[dataIndex];
        if (+value >= initialValue - 0.01 * initialValue && +value <= initialValue + 0.01 * initialValue) {
          return Promise.resolve();
        }
        return Promise.reject('The value must be ±10% + initial currency value');
      },
    }
  ];

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <div className="editable-cell-input-wrap">
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          validateFirst
          rules={exchangeCellRules}
        >
          <Input
            ref={inputRef}
            onPressEnter={save}
            onInput={handleInput}
            value={inputValue}
          />
        </Form.Item>
        <CheckMark
          className={isFieldValid ? 'check-mark-icon' : 'check-mark-icon check-mark-icon-disabled'}
          onClick={save}
        />
        <Cross className="cross-icon" onClick={reset}/>
      </div>
    ) : (
      <div className="editable-cell-value-wrap">
        {children}
        <Edit className="edit-icon" onClick={toggleEdit}/>
      </div>
    );
  }

  return (
    <td {...restProps}>{childNode}</td>
  );
};
