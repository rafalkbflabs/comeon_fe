import { ColumnsType } from 'antd/lib/table';
import { Criteria } from '../../../../../hooks/useProviderManageRewardPlan';
import { Typography, Popconfirm } from 'antd';
import { useState } from 'react';
import { FormikValues } from 'formik';
import { useManageRewardPlan } from '../../../../../hooks/useManageRewardPlan';

type Props = {
  formikValues: FormikValues;
  setFieldValue: any;
}

export const useRevenueShareValuesTable = ({formikValues, setFieldValue}: Props) => {
  const { criteria, setCriteria } = useManageRewardPlan();

  const [editingKey, setEditingKey] = useState<React.Key>();
  const [editingRow, setEditingRow] = useState<React.Key>();

  const isEditing = (record: any) => record.key === editingKey;

  const handleRowSave = () => {
    const updatedCriteria = criteria.map((crit, index) => {
      if(index === editingRow) {
        return {
          ...crit,
          ...formikValues
        } as Criteria;
      }

      return crit

    })

    setCriteria(updatedCriteria)
    setEditingKey(undefined);

  }

  const columns: ColumnsType<Criteria> = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Threshold from',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Threshold to',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Criteria',
      key: 'criterion',
      dataIndex: 'criterion',
    },
    {
      title: 'Percantage',
      key: 'percantage',
      dataIndex: 'percantage',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link style={{ marginRight: 8 }} onClick={() => handleRowSave()}>Save</Typography.Link>
            <Popconfirm title="Sure to cancel?">
              Cancel
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            // disabled={!editingKey}
            onClick={() => {
              setEditingKey((record as any)?.key);
              setEditingRow(index)
            }}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if(col.key === 'action') {
      return col
    }
  
    return {
      ...col,
      onCell: (record: Criteria) => {
        return ({
          record,
          inputType: 'text',
          dataIndex: col.key,
          title: col.title?.toString(),
          editing: isEditing(record),
          setFieldValue: setFieldValue
        })
      },
    };
  });



  return {
    columns: mergedColumns,
    setEditingRow,
    criteria
  }
}