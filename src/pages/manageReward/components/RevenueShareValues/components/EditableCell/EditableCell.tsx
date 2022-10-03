import { Form, Input, InputNumber } from 'antd';
import { Criteria } from '../../../../../../hooks/useProviderManageRewardPlan';
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Criteria & { key: string };
  index: number;
  children: React.ReactNode;
  setFieldValue: any;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  setFieldValue,
  ...restProps
}) => {

  if(!editing || !dataIndex || !record) {
    return <td {...restProps}>{children}</td>;
  }
  
  const inputNode =
      <Input
        name={dataIndex}
        onChange={(e) => setFieldValue(dataIndex, e.currentTarget.value)}
        defaultValue={ (record as any)[dataIndex] || ''}
      />

  return <td {...restProps}>{editing ? inputNode : children}</td>;
};
