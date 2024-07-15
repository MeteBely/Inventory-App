import { useParams, Link } from "react-router-dom";
import { products } from "../product.js";

const Product = () => {
  const { id: productId } = useParams();
  const product = products.find((product) => product._id === Number(productId));
  console.log(product);

  return (
    <section className="bg-[#FAFBFC] fontRoboto h-screen">
      <div className="pl-12 pt-12">
        <Link
          className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
          to="/"
        >
          Go Back
        </Link>
      </div>
      <div>
        <h1 className="text-[#303236] text-[30px] text-center mb-[6px] fontCera font-semibold">
          Zimmet Bilgileri
        </h1>
        <div className="w-[360px] m-auto border border-[#E5E7EB] rounded-md px-2 py-4 bg-white">
          <label className="block w-full mb-4">
            <div className="text-[15px] text-gray-600 fontCera font-semibold">
              Tip
            </div>
            <input
              defaultValue={product.type}
              className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
            />
          </label>
          <label className="block w-full  mb-4">
            <div className="text-[15px] text-gray-600 fontCera font-semibold">
              Envantere giriş tarihi
            </div>
            <input
              defaultValue={product.dateOfEntry}
              className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
            />
          </label>
          <label className="block w-full mb-4">
            <div className="text-[15px] text-gray-600 fontCera font-semibold">
              Marka
            </div>
            <input
              defaultValue={product.brand}
              className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
            />
          </label>
          <label className="block w-full mb-4">
            <div className="text-[15px] text-gray-600 fontCera font-semibold">
              Model
            </div>
            <input
              defaultValue={product.model}
              className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
            />
          </label>
          <label className="block w-full mb-4">
            <div className="text-[15px] text-gray-600 fontCera font-semibold">
              Seri Numarasi
            </div>
            <input
              defaultValue={product.serialNumber}
              className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
            />
          </label>
          <label className="block w-full mb-8">
            <div className="text-[15px] text-gray-600 fontCera font-semibold">
              Statü
            </div>
            <input
              defaultValue={product.status}
              className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
            />
          </label>
          <button
            type="submit"
            className="text-lg font-semibold w-full h-[47.88px] fontCera tracking-wider bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
          >
            ONAYLA
          </button>
        </div>{" "}
      </div>
    </section>
  );
};

export default Product;
