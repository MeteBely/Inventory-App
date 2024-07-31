import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../slices/usersApiSlice";
import Loader from "./Loader";
import Message from "./Message.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const [name, setName] = useState(""); // Boş string ile başlangıç
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState(false);
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("");
  const [unit, setUnit] = useState("");
  const [position, setPosition] = useState("");
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      setName(user.name || "");
      setSurname(user.surname || "");
      setGender(user.gender || "");
      setBirthDate(
        user.birthDate
          ? new Date(user.birthDate).toISOString().substring(0, 10)
          : ""
      );
      setIdentificationNumber(user.identificationNumber || "");
      setMaritalStatus(user.maritalStatus || false);
      setGraduationStatus(user.graduationStatus?.level || "");
      setRegistrationNumber(user.registrationNumber || "");
      setUnit(user.unit?.name || "");
      setPosition(user.position?.name || "");
      setIsWorking(user.isWorking || false);
    }
  }, [isLoading, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isWorking === false && user.inventory?.length !== 0) {
        toast.error(
          "Pasif hale getirmek istediğiniz personelden zimmet eşyalarini çikartiniz!"
        );
      } else {
        const updatedUser = {
          userId,
          name,
          surname,
          gender,
          birthDate,
          identificationNumber,
          maritalStatus,
          registrationNumber,
          graduationStatus:
            graduationStatus.charAt(0).toUpperCase() +
            graduationStatus.slice(1).toLowerCase(),
          unit: unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase(),
          position:
            position.charAt(0).toUpperCase() + position.slice(1).toLowerCase(),
          isWorking,
        };
        await updateUser(updatedUser);
        refetch();
        navigate("/users");
        toast.success("Personel başasiyla güncellendi!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const graduationStatusArr = [
    "Ortaokul",
    "Lise",
    "Lisans",
    "Önlisans",
    "Yüksek lisans",
    "Doktora",
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message negative={true} message={error} />
      ) : (
        <section className="bg-[#FAFBFC] fontRoboto h-screen">
          <div className="pl-12 pt-12">
            <Link
              className="text-[14px] w-auto px-10 py-2 rounded-sm  tracking-widest bg-black hover:bg-[#333] text-[#fff]  mt-4"
              to="/users"
            >
              Go Back
            </Link>
          </div>
          <div>
            <h1 className="text-[#303236] text-[30px] text-center mb-[6px]  font-semibold">
              Personel Bilgileri
            </h1>
            <img src="" alt="" />
            <form
              onSubmit={submitHandler}
              className="flex flex-row items-start justify-center gap-20 border border-[#E5E7EB] rounded-md px-2 py-4 bg-white"
            >
              <div className="w-[380px] flex flex-col gap-4">
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Ad
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Soyad
                  </div>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Cinsiyet
                  </div>
                  <div className="flex items-center mt-2 border-b outline-none pb-2 px-2">
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="M"
                        checked={gender === "M"}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 accent-gray-600"
                      />
                      Erkek
                    </label>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="F"
                        checked={gender === "F"}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 accent-gray-600"
                      />
                      Kadın
                    </label>
                  </div>
                </label>

                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Doğum Tarihi
                  </div>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Medeni Durumu
                  </div>
                  <div className="flex items-center mt-2 border-b outline-none pb-2 px-2">
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Evli"
                        checked={maritalStatus === true}
                        onChange={() => setMaritalStatus(true)}
                        className="mr-2 accent-gray-600"
                      />
                      Evli
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="maritalStatus"
                        value="Bekar"
                        checked={maritalStatus === false}
                        onChange={() => setMaritalStatus(false)}
                        className="mr-2 accent-gray-600"
                      />
                      Bekar
                    </label>
                  </div>
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Kimlik Numarasi
                  </div>
                  <input
                    value={identificationNumber}
                    onChange={(e) => setIdentificationNumber(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
              </div>
              <div className="w-[380px] flex flex-col gap-4">
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Sicil Numarasi
                  </div>
                  <input
                    readOnly
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Mezuniyet Durumu
                  </div>
                  <select
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                    name="availableProducts"
                    id="availableProducts"
                    value={graduationStatus}
                    onChange={(e) => setGraduationStatus(e.target.value)}
                  >
                    {graduationStatusArr.map((graduationStatus) => (
                      <option key={graduationStatus} value={graduationStatus}>
                        {graduationStatus}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Birim
                  </div>
                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Pozisyon
                  </div>
                  <input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2  focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600  font-semibold">
                    Aktif Çalişma Durumu
                  </div>
                  <div className="flex items-center mt-2 border-b outline-none pb-2 px-2">
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="isWorking"
                        value="Evet"
                        checked={isWorking === true}
                        onChange={() => setIsWorking(true)}
                        className="mr-2 accent-gray-600"
                      />
                      Evet
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isWorking"
                        value="Hayır"
                        checked={isWorking === false}
                        onChange={() => setIsWorking(false)}
                        className="mr-2 accent-gray-600"
                      />
                      Hayır
                    </label>
                  </div>
                </label>
                <button
                  type="submit"
                  className="text-lg font-semibold w-full h-[47.88px]  tracking-wider bg-black hover:bg-[#333] text-[#fff]  mt-4"
                >
                  ONAYLA
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default User;
