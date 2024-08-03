import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Kullanici adi zorunludur"),
  password: yup.string().required("Sifre zorunludur"),
});
