import ParticlesComponent from "./ParticlesEffect";
import loginBgImg from "../assets/loginBgImg.png";
import { useCallback, useState } from "react";

const Login = () => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <section>
      <div
        style={{ backgroundImage: `url(${loginBgImg})` }}
        className="h-[80vh] sm:h-screen w-full bg-no-repeat bg-cover max-lg:bg-top sm:bg-fixed relative fontRoboto"
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
          <div>
            <label className="block w-full mb-4">
              <div className="text-[15px] text-[#D3D3D3] font-semibold">
                Kullanici Adi
              </div>
              <input className="w-full h-10 rounded border-b outline-none px-2 focus:border-black" />
            </label>
            <label className="block w-full  mb-4">
              <div className="text-[15px] text-[#D3D3D3] font-semibold">
                Şifre
              </div>
              <input className="w-full h-10 rounded border-b outline-none px-2 focus:border-black" />
            </label>
            <button
              type="submit"
              className="text-lg font-semibold w-full h-[47.88px] tracking-wider bg-black hover:bg-[#333] text-[#fff] mt-4"
            >
              GİRİŞ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
