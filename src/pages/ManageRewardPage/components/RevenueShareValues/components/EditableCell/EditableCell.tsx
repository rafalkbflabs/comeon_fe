import { Input } from 'antd';
import React from 'react';
import { Criteria } from '../../../../../../hooks/useProviderManageRewardPlan';
import './EditableCellStyles.less';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  record: Criteria & { key: string };
  index: number;
  children: React.ReactNode;
  setFieldValue: any;
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
  errorMsg?: string;
  value: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  record,
  index,
  children,
  setFieldValue,
  errorMsg,
  onChange,
  value,
  ...restProps
}) => {

  if(!editing || !dataIndex || !record) {
    return <td {...restProps}>{children}</td>;
  }

  const inputNode =
  <div className='input-wrapper'>
      <Input
        name={dataIndex}
        onChange={onChange}
        defaultValue={ (record as any)[dataIndex] || ''}
        value={value}
      />
      {errorMsg && <span className='input-wrapper-error'>{errorMsg}</span>}
    </div>

  return <td {...restProps}>{editing ? inputNode : children}</td>;
};
