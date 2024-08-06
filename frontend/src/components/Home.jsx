import { clearCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const logoutHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Çikiş yapmak istediginize emin misiniz?")) {
      try {
        await logout().unwrap();
        dispatch(clearCredentials());
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Çikiş yapilirken hata ile karsilasildi!");
      }
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const authController = (e, target) => {
    e.preventDefault();

    if (target === "PersonelYonetimi") {
      if (userInfo.role === "admin" || userInfo.role === "IK") {
        navigate("/users");
      } else {
        toast.error(
          "İnsan kaynaklari ya da admin olarak yetkilendirilmediniz."
        );
      }
    } else if (target === "EnvanterYonetimi") {
      if (userInfo.role === "admin" || userInfo.role === "IM") {
        navigate("/products");
      } else {
        toast.error(
          "Envanter yönetimi ya da admin olarak yetkilendirilmediniz."
        );
      }
    } else if (target === "ZimmetIslemleri") {
      if (userInfo.role === "admin" || userInfo.role === "IK") {
        navigate("/usersDebits");
      } else {
        toast.error(
          "İnsan kaynaklari ya da admin olarak yetkilendirilmediniz."
        );
      }
    } else if (target === "ZimmetGecmisi") {
      if (userInfo.role === "admin" || userInfo.role === "IK") {
        navigate("/productsHistory");
      } else {
        toast.error(
          "İnsan kaynaklari ya da admin olarak yetkilendirilmediniz."
        );
      }
    }
  };

  console.log(userInfo);

  return (
    <section className="bg-black text-white h-screen">
      <div className="text-2xl font-bold fontRoboto flex flex-row items-center gap-6 justify-between w-[90%] m-auto pt-12">
        <button
          className="bg-white px-2 py-1 text-[#303236] hover:bg-[#ccc]"
          onClick={(e) => logoutHandler(e)}
        >
          Çikiş Yap
        </button>
        <div>
          <h2>
            <span className="mr-2 hidden sm:inline">Kullanici:</span>
            {userInfo?.name} {userInfo?.surname}
          </h2>
        </div>
      </div>
      <div className="text-4xl font-bold fontRoboto flex flex-row items-center justify-around gap-12 mt-40 flex-wrap px-4">
        {(userInfo.role === "IK" || userInfo.role === "admin") && (
          <>
            <div>
              <button onClick={(e) => authController(e, "PersonelYonetimi")}>
                <h2 className="relative no-underline hover:text-[#ccc] before:absolute before:block before:w-[100%] before:h-[2px] before:bottom-0 before:left-0 before:bg-[#ddd] before:scale-x-0 before:duration-300 hover:before:scale-x-100 before:origin-top-left">
                  Personel Yönetimi
                </h2>
              </button>
            </div>
            <div>
              <button onClick={(e) => authController(e, "ZimmetIslemleri")}>
                <h2 className="relative no-underline hover:text-[#ccc] before:absolute before:block before:w-[100%] before:h-[2px] before:bottom-0 before:left-0 before:bg-[#ddd] before:scale-x-0 before:duration-300 hover:before:scale-x-100 before:origin-top-left">
                  Zimmet İşlemleri
                </h2>
              </button>
            </div>
            <div>
              <button onClick={(e) => authController(e, "ZimmetGecmisi")}>
                <h2 className="relative no-underline hover:text-[#ccc] before:absolute before:block before:w-[100%] before:h-[2px] before:bottom-0 before:left-0 before:bg-[#ddd] before:scale-x-0 before:duration-300 hover:before:scale-x-100 before:origin-top-left">
                  Zimmet Geçmişi
                </h2>
              </button>
            </div>
          </>
        )}
        {(userInfo.role === "IM" || userInfo.role === "admin") && (
          <>
            <div>
              <button onClick={(e) => authController(e, "EnvanterYonetimi")}>
                <h2 className="relative no-underline hover:text-[#ccc] before:absolute before:block before:w-[100%] before:h-[2px] before:bottom-0 before:left-0 before:bg-[#ddd] before:scale-x-0 before:duration-300 hover:before:scale-x-100 before:origin-top-left">
                  Envanter Yönetimi
                </h2>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
