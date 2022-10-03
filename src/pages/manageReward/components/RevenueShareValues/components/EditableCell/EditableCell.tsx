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
  setFieldTouched: (field: string, isTouched: boolean, shouldValidate: boolean) => void;
  handleBlur: (dataIndex: string, value: string) => void;
  errorMsg?: string;
  value: string;
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
  setFieldTouched,
  errorMsg,
  handleBlur,
  value,
  ...restProps
}) => {

  if(!editing || !dataIndex || !record) {
    return <td {...restProps}>{children}</td>;
  }
  
  const inputNode =
  <>
      <Input
        name={dataIndex}
        onChange={(e) => {
          setFieldValue(dataIndex, e.currentTarget.value);
          setFieldTouched(dataIndex, true, false);
        }}
        onBlur={(e) => handleBlur(dataIndex, e.currentTarget.value)}
        defaultValue={ (record as any)[dataIndex] || ''}
        value={value}
      />
      {errorMsg && <p>{errorMsg}</p>}
    </>

  return <td {...restProps}>{editing ? inputNode : children}</td>;
};
