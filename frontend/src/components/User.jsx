import { useParams, Link } from "react-router-dom";
import { users } from "../users.js";

const User = () => {
  const { id: userId } = useParams();
  const user = users.find((product) => product._id === Number(userId));
  console.log(user);

  return (
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
        <div className="flex flex-row items-start justify-center gap-20 border border-[#E5E7EB] rounded-md px-2 py-4 bg-white">
          <div className="w-[380px] flex flex-col gap-4">
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Ad
              </div>
              <input
                defaultValue={user.name}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Soyad
              </div>
              <input
                defaultValue={user.surname}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Cinsiyet
              </div>
              <input
                defaultValue={user.gender}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Doğum Tarihi
              </div>
              <input
                defaultValue={user.birthDate}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Medeni Durumu
              </div>
              <input
                defaultValue={user.maritalStatus}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Kimlik Numarasi
              </div>
              <input
                defaultValue={user.identificationNumber}
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
                defaultValue={user.registrationNumber}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Mezuniyet Durumu
              </div>
              <input
                defaultValue={user.graduationStatus}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Birim
              </div>
              <input
                defaultValue={user.unit}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Görev
              </div>
              <input
                defaultValue={user.position}
                className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
              />
            </label>
            <label className="block w-full">
              <div className="text-[15px] text-gray-600 fontCera font-semibold">
                Aktif Çalişma Durumu
              </div>
              <input
                defaultValue={user.isWorking}
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
        </div>{" "}
      </div>
    </section>
  );
};

export default User;
