import * as yup from "yup";

export const productSchema = yup.object().shape({
  type: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .required("Zimmet Tipi zorunludur"),
  dateOfEntry: yup.date().required("Giris tarihi zorunludur"),
  brand: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .required("Marka adi zorunludur"),
  model: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .required("Zimmet modeli zorunludur"),
  serialNumber: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .required("Zimmetin seri numarasi zorunludur"),
  status: yup
    .string()
    .oneOf(["Ofiste", "Depoda", "Personelde"], "Zimmet durumunu seciniz")
    .required("Durum zorunludur"),
});
