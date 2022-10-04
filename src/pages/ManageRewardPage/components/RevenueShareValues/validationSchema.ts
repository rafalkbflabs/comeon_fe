import * as Yup from 'yup';

const validationSchema = Yup.object({
    product: Yup.string().trim().required(),
    from: Yup.number().typeError('You must specify a number').required(),
    to: Yup.number().typeError('You must specify a number').required(),
    criterion: Yup.string().trim().required(),
    percantage: Yup.number().typeError('You must specify a number').min(0, 'Number must be greater than 0').max(100, 'Number cannot exceed 100.').required('Field required'),
  });

export default validationSchema;