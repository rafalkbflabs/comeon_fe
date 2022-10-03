import { Table, Empty } from 'antd';
import { useFormik } from 'formik';
import { useManageRewardPlan } from '../../../../hooks/useManageRewardPlan';
import { EditableCell } from './components/EditableCell/EditableCell';
import { useRevenueShareValuesTable } from './hooks/useRevenueShareValuesTable';

export const RevenueShareValues = () => {
  const { setCriteria } = useManageRewardPlan();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (v) => {},
  });

  const { criteria, columns, setEditingRow } = useRevenueShareValuesTable({
    formikValues: formik.values,
    setFieldValue: formik.setFieldValue,
  });

  const test = () => {
    setCriteria(() => [
      {
        product: '1',
        from: '2',
        to: '3',
        criterion: '4',
        percantage: '5',
      },
      ...criteria,
    ]);

    setEditingRow(0);
  };

  return (
    <>
      <button onClick={test}>Eooo</button>
      {criteria.length !== 0 ? (
        <form onSubmit={formik.handleSubmit}>
          <Table
            columns={columns}
            dataSource={criteria.map((c, index) => ({ ...c, key: c.criterion + index }))}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            pagination={false}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <Empty />
      )}
    </>
  );
};
