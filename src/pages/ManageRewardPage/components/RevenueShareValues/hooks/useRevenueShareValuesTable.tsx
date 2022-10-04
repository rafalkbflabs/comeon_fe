import { ColumnsType } from 'antd/lib/table';
import { Criteria } from '../../../../../hooks/useProviderManageRewardPlan';
import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { useManageRewardPlan } from '../../../../../hooks/useManageRewardPlan';
import { notification } from 'antd';
import currencyFormatter from '../../../../../helpers/currencyFormatter';
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';

type Props = {
  formik: FormikProps<any>
};

export const useRevenueShareValuesTable = ({
  formik
}: Props) => {
  const { criteria, setCriteria } = useManageRewardPlan();

  const [editingKey, setEditingKey] = useState<React.Key>();
  const [criterionEditable, setCriterionEditable] = useState(true);

  const {values: {product, criterion}, errors, setFieldValue, setErrors} = formik;

  useEffect(() => {
    if (criteria.length === 0 ) return;

    const prevProduct = criteria.find(
      (critElem) => critElem.product === product
    );

    if (prevProduct) {
      console.log('elo')
      setFieldValue(
        'from',
        (parseInt(prevProduct.to, 10) + 0.01).toString()
      );
      setFieldValue('criterion', prevProduct.criterion);
      setCriterionEditable(false)
    } else {
      setCriterionEditable(true)
    }

  }, [product, setFieldValue, criteria])

  useEffect(() => {
    const prevProduct = criteria.find(
      (critElem) => critElem.product === product
    );

    if(!criterionEditable && prevProduct?.criterion !== criterion) {
      setErrors({...errors, criterion: "Criteria has to mach previous description."})
    } else {
      const {criterion, ...rest} = errors;
      setErrors({...rest})
    }
  }, [criterion, setErrors, criterionEditable, errors, product, criteria])

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
      width: 10,
    },
    {
      title: 'Threshold from',
      dataIndex: 'from',
      key: 'from',
      render: (value: string) => currencyFormatter.format(parseInt(value, 10)),
      width: 10,
    },
    {
      title: 'Threshold to',
      dataIndex: 'to',
      key: 'to',
      render: (value: string) => currencyFormatter.format(parseInt(value, 10)),
      width: 10,
    },
    {
      title: 'Criteria',
      key: 'criterion',
      dataIndex: 'criterion',
      width: '180px',
      render: (text) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Percantage',
      key: 'percantage',
      dataIndex: 'percantage',
      render: (value: string) => value +'%',
      width: 10,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      width: '60px',
      render: (_, record, index) => {
        const editable = isEditing(record);
        if (editable) {
          return (
            <Typography.Link
              style={{ marginRight: 8 }}
              onClick={() => handleRowSave()}
              disabled={!formik.isValid}
            >
              Save
            </Typography.Link>
          )
        }

        if (index === 0) {
          return (
            <Button
              className='edit-row-button'
              onClick={() => {
                formik.setValues({...criteria[0]})
                setEditingKey((record as any)?.key);
              }}
              icon={<EditOutlined />}
            />
          );
        }

        return (
          <Button
            className='remove-row-button'
            disabled={!!editingKey}
            onClick={() => {
              setCriteria(prev => prev.filter((_, EIndex) => EIndex !== index))
            }}
            icon={<MinusCircleOutlined />}
          />
        )
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (col.key === 'action') {
      return col;
    }

    return {
      ...col,
      onCell: (record: Criteria) => {
        return {
          record,
          dataIndex: col.key,
          title: col.title?.toString(),
          editing: isEditing(record),
          value: formik.values[col.key!],
          errorMsg: formik.touched[col.key!] ?  formik.errors[col.key!] : '',
          onChange: (e: React.ChangeEvent<HTMLFormElement>) => {
            formik.setFieldValue(col?.key!.toString(), e.currentTarget.value);
            formik.setFieldTouched(col?.key!.toString(), true, false);
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
