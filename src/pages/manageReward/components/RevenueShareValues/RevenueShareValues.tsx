import { Table, Empty } from 'antd';
import { useFormik } from 'formik';
import { useManageRewardPlan } from '../../../../hooks/useManageRewardPlan';
import { EditableCell } from './components/EditableCell/EditableCell';
import { useRevenueShareValuesTable } from './hooks/useRevenueShareValuesTable';
import validationSchema from './validationSchema';

const formInitialValues = {
  product: '',
  from: '',
  to: '',
  criterion: '',
  percantage: '',
};

export const RevenueShareValues = () => {
  const { setCriteria } = useManageRewardPlan();

  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema,
    onSubmit: (v) => {},
  });

  const {
    criteria,
    columns,
    disableAddingItem,
    setEditingKey,
  } = useRevenueShareValuesTable({
    formik
  });

  const test = () => {
    setCriteria(() => [
      formInitialValues,
      ...criteria,
    ]);
    setEditingKey('key_0');
  };

  return (
    <>
      <button onClick={test} disabled={disableAddingItem}>
        Eooo
      </button>
      {criteria.length !== 0 ? (
        <form onSubmit={formik.handleSubmit}>
          <Table
            columns={columns}
            dataSource={criteria.map((c, index) => ({
              ...c,
              key: 'key_' + index,
            }))}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            pagination={false}
            scroll={{ x: 400 }}
          />
        </form>
      ) : (
        <Empty />
      )}
    </>
  );
};
