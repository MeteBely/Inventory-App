import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductDetailsMutation,
} from "../slices/productsApiSlice";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Product = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductDetailsMutation();

  const [type, setType] = useState("");
  const [dateOfEntry, setDateOfEntry] = useState(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isLoading && product) {
      setType(product.type?.name || "");
      setDateOfEntry(
        product.dateOfEntry
          ? new Date(product.dateOfEntry).toISOString().substring(0, 10)
          : null
      );
      setBrand(product.brand?.name || "");
      setModel(product.model || "");
      setSerialNumber(product.serialNumber || "");
      setStatus(product.status || "");
    }
  }, [isLoading, product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        productId,
        type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
        dateOfEntry,
        brand: brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase(),
        model,
        serialNumber,
        status,
      };
      await updateProduct(updatedProduct);
      refetch();
      toast.success("Zimmet başariyla güncellendi!");
      navigate("/products");
    } catch (err) {
      toast.error("Zimmet güncellenirken hata ile karsilasildi!");
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
          <div className="pl-12 pt-12">
            <Link
              className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
              to="/products"
            >
              Go Back
            </Link>
          </div>
          <div>
            <h1 className="text-[#303236] text-[30px] text-center mb-[6px] fontCera font-semibold">
              Zimmet Bilgileri
            </h1>
            <form action="" onSubmit={(e) => submitHandler(e)}>
              {" "}
              <div className="w-[360px] m-auto border border-[#E5E7EB] rounded-md px-2 py-4 bg-white">
                <label className="block w-full mb-4">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Tip
                  </div>
                  <input
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full  mb-4">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Envantere giriş tarihi
                  </div>
                  <input
                    type="date"
                    readOnly
                    value={dateOfEntry}
                    onChange={(e) => setDateOfEntry(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full mb-4">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Marka
                  </div>
                  <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full mb-4">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Model
                  </div>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <label className="block w-full mb-4">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Seri Numarasi
                  </div>
                  <input
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full h-10 rounded border-b outline-none px-2 fontCera focus:border-black"
                  />
                </label>
                <div className="block w-full mb-8">
                  <div className="text-[15px] text-gray-600 fontCera font-semibold">
                    Statü
                  </div>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        disabled
                        type="radio"
                        value="Depoda"
                        checked={status === "Depoda"}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mr-2 accent-gray-600"
                      />
                      Depoda
                    </label>
                    <label className="flex items-center">
                      <input
                        disabled
                        type="radio"
                        value="Personelde"
                        checked={status === "Personelde"}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mr-2 accent-gray-600"
                      />
                      Personelde
                    </label>
                    <label className="flex items-center">
                      <input
                        disabled
                        type="radio"
                        value="Ofiste"
                        checked={status === "Ofiste"}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mr-2 accent-gray-600"
                      />
                      Ofiste
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-lg font-semibold w-full h-[47.88px] fontCera tracking-wider bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
                >
                  ONAYLA
                </button>
              </div>{" "}
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Product;
