import { useManageRewardPlan } from '../../../../hooks/useManageRewardPlan';
import { Button, Checkbox, Input, notification, Col, Row } from 'antd';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import './BasicDataFormStyles.less';
import { Section } from '../../../../components/Section/Section';

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
    <Section>
      <form
        onSubmit={formik.handleSubmit}
        autoComplete="off"
        className="basic-data-form"
      >
        <Row>
          <Col span={6} offset={6}>
            <label className="label" htmlFor="name">
              <span className="label-text">Name*</span>
              <Input
                id="name"
                onChange={(e) =>
                  formik.setFieldValue('name', e.currentTarget.value)
                }
              />
            </label>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={6}>
            <Checkbox
              onChange={(e) =>
                formik.setFieldValue('preferred', e.target.checked)
              }
              checked={formik.values.preferred}
              id="preferred"
              className="checkbox"
            >
              Preferred
            </Checkbox>
          </Col>
        </Row>

        <Row>
          <Col span={6} offset={6}>
            <Button type="primary" htmlType="submit" disabled={!formik.isValid}>
              Save & continue editing
            </Button>
          </Col>
        </Row>
      </form>
    </Section>
  );
};
