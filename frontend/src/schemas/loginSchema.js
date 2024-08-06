import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .required("Kullanici adi zorunludur"),
  password: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .required("Sifre zorunludur"),
});
