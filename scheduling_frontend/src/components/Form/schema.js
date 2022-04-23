import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().required().max(20),
  time: yup.date().required(),
  date: yup.date().required(),
  birth_date: yup.date().required(),
});
