/* eslint-disable func-names */
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().trim().required(),
    preferred: Yup.boolean().required(),
  });

export default validationSchema;
