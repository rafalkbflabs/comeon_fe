import { Table, Empty, Button } from 'antd';
import { useFormik } from 'formik';
import { useManageRewardPlan } from '../../../../hooks/useManageRewardPlan';
import { EditableCell } from './components/EditableCell/EditableCell';
import { useRevenueShareValuesTable } from './hooks/useRevenueShareValuesTable';
import validationSchema from './validationSchema';
import './RevenueShareValuesStyles.less';
import { Section } from '../../../../components/Section/Section';
import { PlusCircleOutlined } from '@ant-design/icons';

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
    onSubmit: () => {},
  });

  const {
    criteria,
    columns,
    disableAddingItem,
    setEditingKey,
  } = useRevenueShareValuesTable({
    formik,
  });

  const addNewRow = () => {
    setCriteria(() => [formInitialValues, ...criteria]);
    setEditingKey('key_0');
  };

  return (
    <div className="revenue-share-values">
      <Section
        header={
          <div className="revenue-share-values-header">
            <span>Revenue share values</span>
            <Button onClick={addNewRow} disabled={disableAddingItem} icon={<PlusCircleOutlined />} />
          </div>
        }
      >
        {criteria.length !== 0 ? (
          <form onSubmit={formik.handleSubmit}>
            <Table
              columns={columns}
              className="table-striped-rows"
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
              scroll={{ x: 600 }}
            />
          </form>
        ) : (
          <Empty />
        )}
      </Section>
    </div>
  );
};
