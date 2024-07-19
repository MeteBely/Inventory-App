import { useParams, Link } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../slices/usersApiSlice";
import Loader from "./Loader";
import Message from "./Message.jsx";
import { useEffect, useState } from "react";

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

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [graduationStatus, setGraduationStatus] = useState("");
  const [unit, setUnit] = useState("");
  const [position, setPosition] = useState("");
  const [isWorking, setIsWorking] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      setName(user.name || "");
      setSurname(user.surname || "");
      setGender(user.gender || "");
      setBirthDate(user.birthDate || "");
      setIdentificationNumber(user.identificationNumber || "");
      setMaritalStatus(user.maritalStatus || "");
      setGraduationStatus(user.graduationStatus?.level || "");
      setRegistrationNumber(user.registrationNumber || "");
      setUnit(user.unit?.name || "");
      setPosition(user.position?.name || "");
      setIsWorking(user.isWorking || "");
    }
  }, [isLoading, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId,
      name,
      surname,
      gender,
      birthDate,
      identificationNumber,
      maritalStatus,
      registrationNumber,
      graduationStatus,
      unit,
      position,
      isWorking,
    };
    await updateUser(updatedUser);
    refetch();
    console.log("submit");
  };

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
              className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
              to="/users"
            >
              Go Back
            </Link>
          </div>
          <div>
            <h1 className="text-[#303236] text-[30px] text-center mb-[6px] fontCera font-semibold">
              Personel Bilgileri
            </h1>
            <img src="" alt="" />
            <form
              onSubmit={(e) => submitHandler(e)}
              className="flex flex-row items-start justify-center gap-20 border border-[#E5E7EB] rounded-md px-2 py-4 bg-white"
            >
              <div className="w-[380px] flex flex-col gap-4">
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Ad
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Soyad
                  </div>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Cinsiyet
                  </div>
                  <input
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Doğum Tarihi
                  </div>
                  <input
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Medeni Durumu
                  </div>
                  <input
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Kimlik Numarasi
                  </div>
                  <input
                    value={identificationNumber}
                    onChange={(e) => setIdentificationNumber(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
              </div>
              <div className="w-[380px] flex flex-col gap-4">
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Sicil Numarasi
                  </div>
                  <input
                    readOnly
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Mezuniyet Durumu
                  </div>
                  <input
                    value={graduationStatus}
                    onChange={(e) => setGraduationStatus(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Birim
                  </div>
                  <input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Pozisyon
                  </div>
                  <input
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Aktif Çalişma Durumu
                  </div>
                  <input
                    value={isWorking}
                    onChange={(e) => setIsWorking(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <button
                  type="submit"
                  className="text-lg font-semibold w-full h-[47.88px] fontCera tracking-wider bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
                >
                  ONAYLA
                </button>
              </div>
            </form>{" "}
          </div>
        </section>
      )}
    </>
  );
};

export default User;
