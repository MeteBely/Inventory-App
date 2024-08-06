import ParticlesComponent from "./ParticlesEffect";
import loginBgImg from "../assets/loginBgImg.png";
import { useCallback, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.jsx";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { loginSchema } from "../schemas/index.js";
import CustomInput from "./form-components/CustomInput.jsx";

const Login = () => {
  const [isHover, setIsHover] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/menu";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //zaten userInfo varsa buraya yönlendirme yapılan yerde nereye redirect paramı kullanılmışsa oraya yönlendiriyoruz.
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  //LOG IN butonuna basılırsa tetiklenir, girilen bilgiler doğru ise setCredentials ile local'e userInfo savelenir(backend endpoint'den dönen veriler ile). Var ise redirect edilir, yoksa home page'e yönlenilir.
  const onSubmit = async (values, actions) => {
    try {
      const res = await login(values).unwrap(); //promise eder
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error("Kullanici adi veya şifre yanliş!");
    }
  };

  return (
    <section>
      <div
        style={{ backgroundImage: `url(${loginBgImg})` }}
        className="h-screen w-full bg-no-repeat bg-cover max-lg:bg-top sm:bg-fixed relative fontRoboto"
      >
        <ParticlesComponent id="tsparticles-custom" />
        <div
          className="w-[300px] px-2 pb-4 pt-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent border backdrop-blur-sm rounded-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2
            className={`text-[#E0E0E0] text-[30px] text-center mb-3 font-semibold relative no-underline hover:text-[#303236] before:absolute before:block before:w-[100%] before:h-[2px] before:bottom-0 before:left-0 before:bg-[#E0E0E0] before:scale-x-0 before:duration-300  ${
              isHover ? "before:scale-x-100" : ""
            }`}
          >
            HOŞ GELDİNİZ
          </h2>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={onSubmit}
            validationSchema={loginSchema}
          >
            {({ values }) => (
              <Form className="">
                <CustomInput label="Kullanici Adi" name="username" />
                <br />
                <CustomInput type="password" label="Şifre" name="password" />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-lg font-semibold w-full h-[47.88px] tracking-wider bg-black hover:bg-[#333] text-[#fff] mt-4"
                >
                  GİRİŞ
                </button>
                {/* {isLoading && <Loader />} */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
