import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("İsim zorunludur"),
  surname: yup.string().required("Soyadi zorunludur"),
  gender: yup.string().required("Cinsiyet zorunludur"),
  birthDate: yup.date().required("Dogum tarihi zorunludur"),
  maritalStatus: yup.boolean().required("Medeni durumu zorunludur"),
  identificationNumber: yup.string().required("Kimlik numarasi zorunludur"),
  registrationNumber: yup.string().required("Sicil numarasi zorunludur"),
  graduationStatus: yup.string().required("Mezuniyet durumu zorunludur"),
  unit: yup.string().required("Birim zorunludur"),
  position: yup.string().required("Pozisyon zorunludur"),
  isWorking: yup.boolean().required("Calisma durumu zorunludur"),
});
