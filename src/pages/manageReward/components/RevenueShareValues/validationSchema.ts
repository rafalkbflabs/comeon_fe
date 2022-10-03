import * as Yup from 'yup';

const validationSchema = Yup.object({
    product: Yup.string().trim().required(),
    from: Yup.number().required(),
    to: Yup.number().required(),
    criterion: Yup.string().trim().required(),
    percantage: Yup.number().min(0).max(100).required(),
  });

export default validationSchema;