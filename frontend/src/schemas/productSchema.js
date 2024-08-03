import * as yup from "yup";

export const productSchema = yup.object().shape({
  type: yup.string().required("Zimmet Tipi zorunludur"),
  dateOfEntry: yup.date().required("Giris tarihi zorunludur"),
  brand: yup.string().required("Marka adi zorunludur"),
  model: yup.string().required("Zimmet modeli zorunludur"),
  serialNumber: yup.string().required("Zimmetin seri numarasi zorunludur"),
  status: yup.string().required("Durum zorunludur"),
});
