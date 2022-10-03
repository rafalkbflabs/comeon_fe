import { ColumnsType } from 'antd/lib/table';
import { Criteria } from '../../../../../hooks/useProviderManageRewardPlan';
import { Typography } from 'antd';
import { useState } from 'react';
import { FormikProps } from 'formik';
import { useManageRewardPlan } from '../../../../../hooks/useManageRewardPlan';
import { notification } from 'antd';

type Props = {
  formik: FormikProps<any>
};

export const useRevenueShareValuesTable = ({
  formik
}: Props) => {
  const { criteria, setCriteria } = useManageRewardPlan();

  const [editingKey, setEditingKey] = useState<React.Key>();

  const isEditing = (record: any) => record.key === editingKey;

  const handleRowSave = () => {
    const updatedCriteria = criteria.map((crit, index) => {
      if ('key_' + index === editingKey) {
        return {
          ...crit,
          ...formik.values,
        } as Criteria;
      }

      return crit;
    });

    setCriteria(updatedCriteria);
    setEditingKey(undefined);
    formik.resetForm();
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
        if (editable) {
          return (
            <span>
            <Typography.Link
              style={{ marginRight: 8 }}
              onClick={() => handleRowSave()}
            >
              Save
            </Typography.Link>
          </span>
          )
        }

        if (index === 0) {
          return (
            <Typography.Link
              onClick={() => {
                setEditingKey((record as any)?.key);
              }}
            >
              Edit
            </Typography.Link>
          );
        }

        return (
          <Typography.Link
          disabled={!!editingKey}
          onClick={() => {
            setCriteria(prev => prev.filter((elem, EIndex) => EIndex !== index))
          }}
        >
          Delete
        </Typography.Link>
        )
      },
    },
  ];

  const setDataBasedOnPrevious = (prevProduct: Criteria, dataIndex: string) => {
    if (dataIndex === 'product') {
      formik.setFieldValue(
        'from',
        (parseInt(prevProduct.to, 10) + 0.1).toString()
      );
    }

    if (dataIndex === 'criterion') {
      formik.setFieldValue('criterion', prevProduct.criterion);
    }
  }

  const mergedColumns = columns.map((col) => {
    if (col.key === 'action') {
      return col;
    }

    return {
      ...col,
      onCell: (record: Criteria) => {
        return {
          record,
          inputType: 'text',
          dataIndex: col.key,
          title: col.title?.toString(),
          editing: isEditing(record),
          value: formik.values[col.key!],
          errorMsg: formik.touched[col.key!] ?  formik.errors[col.key!] : '',
          setFieldValue: formik.setFieldValue,
          setFieldTouched: formik.setFieldTouched,
          handleBlur: (dataIndex: string, inputValue: string) => {
            const prevProduct = criteria.find(
              (critElem) => critElem.product === inputValue
            );

            if (prevProduct) setDataBasedOnPrevious(prevProduct, dataIndex)

            if (inputValue === '100' && dataIndex === 'percantage') {
              notification.warning({
                message: '100% has been set.',
              });
            }
          },
        };
      },
    };
  });

  return {
    columns: mergedColumns,
    setEditingKey,
    criteria,
    disableAddingItem: editingKey !== undefined && criteria.length > 0
  };
};
