import * as yup from "yup";
const identificationNumberRegExp = /^[1-9]{1}[0-9]{9}[02468]{1}$/g;

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .matches(
      /^[A-Za-z ]*$/,
      "Lütfen gecerli bir isim giriniz, özel karakterler kullanmayiniz"
    )
    .required("İsim zorunludur"),
  surname: yup
    .string()
    .max(20, "Maksimum 20 karakter girilebilir")
    .matches(
      /^[A-Za-z ]*$/,
      "Lütfen gecerli bir isim giriniz, özel karakterler kullanmayiniz"
    )
    .required("Soyadi zorunludur"),
  gender: yup
    .string()
    .oneOf(["M", "F"], 'Cinsiyet yalnızca "Male" veya "Female" olabilir')
    .required("Cinsiyet zorunludur"),
  birthDate: yup.date().required("Dogum tarihi zorunludur"),
  maritalStatus: yup.boolean().required("Medeni durumu zorunludur"),
  identificationNumber: yup
    .string()
    .matches(identificationNumberRegExp, "Lutfen gecerli bir kimlik no giriniz")
    .required("Kimlik numarasi zorunludur"),
  registrationNumber: yup.string().required("Sicil numarasi zorunludur"),
  graduationStatus: yup
    .string()
    .oneOf(
      ["Ortaokul", "Lise", "Lisans", "Önlisans", "Yüksek lisans", "Doktora"],
      "Gecerli bir mezuniyet durumu seciniz"
    )
    .required("Mezuniyet durumu zorunludur"),
  unit: yup
    .string()
    .max(40, "Maksimum 40 karakter girilebilir")
    .required("Birim zorunludur"),
  position: yup
    .string()
    .max(40, "Maksimum 40 karakter girilebilir")
    .required("Pozisyon zorunludur"),
  isWorking: yup.boolean().required("Calisma durumu zorunludur"),
});
