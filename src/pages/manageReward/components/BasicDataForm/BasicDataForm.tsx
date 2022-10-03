import { useManageRewardPlan } from '../../../../hooks/useManageRewardPlan';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';

export const BasicDataForm = () => {
  const { setName } = useManageRewardPlan();

  const formik = useFormik({
    initialValues: {
      name: '',
      preferred: false,
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      setName(values.name);

      notification.success({
        message: 'Saved successfully.',
      });
    },
  });

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={formik.initialValues}
      onFinish={formik.handleSubmit}
      autoComplete="off"
    >
      <Form.Item label="Name" name="name">
        <Input
          onChange={(e) => formik.setFieldValue('name', e.currentTarget.value)}
        />
      </Form.Item>

      <Form.Item name="preferred" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox
          onChange={(e) => formik.setFieldValue('preferred', e.target.checked)}
          checked={formik.values.preferred}
        >
          Preferred
        </Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={!formik.isValid}>
          Save & continue editing
        </Button>
      </Form.Item>
    </Form>
  );
};
