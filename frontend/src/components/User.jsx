import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../slices/usersApiSlice";
import Loader from "./Loader";
import Message from "./Message.jsx";
import { toast } from "react-toastify";
import CustomInput from "./form-components/CustomInput.jsx";
import CustomRadio from "./form-components/CustomRadio.jsx";
import { Form, Formik } from "formik";
import { userSchema } from "../schemas/index.js";
import CustomSelect from "./form-components/CustomSelect.jsx";

const User = () => {
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] =
    useUpdateUserDetailsMutation();

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      if (values.isWorking === false && user.inventory?.length !== 0) {
        toast.error(
          "Pasif hale getirmek istediğiniz personelden zimmet eşyalarini çikartiniz!"
        );
      } else {
        const updatedUser = {
          userId,
          name: values.name,
          surname: values.surname,
          gender: values.gender,
          birthDate: values.birthDate,
          identificationNumber: values.identificationNumber,
          maritalStatus: values.maritalStatus,
          registrationNumber: values.registrationNumber,
          graduationStatus:
            values.graduationStatus.charAt(0).toUpperCase() +
            values.graduationStatus.slice(1).toLowerCase(),
          unit:
            values.unit.charAt(0).toUpperCase() +
            values.unit.slice(1).toLowerCase(),
          position:
            values.position.charAt(0).toUpperCase() +
            values.position.slice(1).toLowerCase(),
          isWorking: values.isWorking,
        };
        await updateUser(updatedUser);
        refetch();
        navigate("/users");
        toast.success("Personel başasiyla güncellendi!");
      }
    } catch (err) {
      toast.error("Kullanici güncellenme sirasinda hata ile karsilasildi!");
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message negative={true} message={error} />
      ) : (
        <section className="bg-[#FAFBFC] fontRoboto h-screen">
          <div className="pl-4 pt-12 mb-4">
            <Link
              className="text-[14px] w-auto px-10 py-2 rounded-sm  tracking-widest bg-black hover:bg-[#333] text-[#fff] mt-4"
              to="/users"
            >
              Go Back
            </Link>
          </div>
          <div>
            <h1 className="text-[#303236] text-[30px] text-center mb-[6px] font-semibold">
              Personel Bilgileri
            </h1>
            <img src="" alt="" />
            <Formik
              initialValues={{
                name: user.name || "",
                surname: user.surname || "",
                gender: user.gender || "",
                birthDate: user.birthDate
                  ? new Date(user.birthDate).toISOString().substring(0, 10)
                  : "",
                maritalStatus: user.maritalStatus || false,
                identificationNumber: user.identificationNumber || "",
                registrationNumber: user.registrationNumber || "",
                graduationStatus: user.graduationStatus?.level || "",
                unit: user.unit?.name || "",
                position: user.position?.name || "",
                isWorking: user.isWorking || false,
              }}
              onSubmit={onSubmit}
              validationSchema={userSchema}
            >
              {({ values }) => (
                <Form className="flex flex-row items-start justify-center gap-12 min-[500px]:gap-20 border border-[#E5E7EB] rounded-md px-2 py-4 bg-white">
                  <div className="w-[380px] flex flex-col">
                    <CustomInput label="Ad" name="name" />
                    <br />
                    <CustomInput label="Soyad" name="surname" />
                    <br />
                    <CustomRadio
                      label="Cinsiyet"
                      name="gender"
                      options={[
                        { key: "M", value: "Erkek" },
                        { key: "F", value: "Kadın" },
                      ]}
                    />
                    <br />
                    <CustomInput
                      type="date"
                      label="Doğum Tarihi"
                      name="birthDate"
                    />
                    <br />
                    <CustomRadio
                      label="Medeni Durumu"
                      name="maritalStatus"
                      options={[
                        { key: true, value: "Evli" },
                        { key: false, value: "Bekar" },
                      ]}
                    />
                    <br />
                    <CustomInput
                      label="Kimlik Numarasi"
                      name="identificationNumber"
                    />
                  </div>
                  <div className="w-[380px] flex flex-col">
                    <CustomInput
                      disabled
                      label="Sicil Numarasi"
                      name="registrationNumber"
                    />
                    <br />
                    <CustomSelect
                      label="Mezuniyet Durumu"
                      name="graduationStatus"
                      options={[
                        { key: "Ortaokul", value: "Ortaokul" },
                        { key: "Lise", value: "Lise" },
                        { key: "Lisans", value: "Lisans" },
                        { key: "Önlisans", value: "Önlisans" },
                        { key: "Yüksek lisans", value: "Yüksek lisans" },
                        { key: "Doktora", value: "Doktora" },
                      ]}
                    />
                    <br />
                    <CustomInput label="Birim" name="unit" />
                    <br />
                    <CustomInput label="Pozisyon" name="position" />
                    <br />
                    <CustomRadio
                      label="Aktif Çalişma Durumu"
                      name="isWorking"
                      options={[
                        { key: true, value: "Evet" },
                        { key: false, value: "Hayır" },
                      ]}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="text-lg font-semibold w-full h-[47.88px] tracking-wider bg-black hover:bg-[#333] text-[#fff] mt-4"
                    >
                      ONAYLA
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {loadingUpdate && <Loader />}
          </div>
        </section>
      )}
    </>
  );
};

export default User;
