import { FaEdit, FaRegPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useCreateSampleProductMutation,
} from "../slices/productsApiSlice.js";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";
import { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [createSampleProduct, { isLoading: loadingCreate }] =
    useCreateSampleProductMutation();

  const createSampleProductHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await createSampleProduct().unwrap();
      console.log(data);
      navigate(`/product/${data._id}`);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const filteredProducts = products?.filter((product) => {
    const typeName = product.type?.name.toLowerCase() || ""; // type varsa küçük harflerle al, yoksa boş string
    const searchLowerCase = searchTerm.toLowerCase();

    return typeName.includes(searchLowerCase) || searchTerm.trim() === "";
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          negative={true}
          message={error?.error || error?.data?.message}
        />
      ) : (
        <section className="fontRoboto">
          <div className="pl-12 pt-12">
            <Link
              className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
              to="/"
            >
              Go Back
            </Link>
          </div>
          <div className="flex flex-row items-center justify-around pt-8 mb-4">
            <h2 className="text-5xl font-bold tracking-wider">Zimmetler</h2>
            <button onClick={(e) => createSampleProductHandler(e)}>
              <FaRegPlusSquare size={60} />
            </button>
          </div>
          <div className="flex flex-row items-center justify-center gap-10 mb-8">
            <input
              type="text"
              id="first_name"
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Envanter Tipi Giriniz..."
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="button"
              className="text-white mt-[6px] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
              onClick={() => setSearchTerm(searchTerm)}
            >
              Ara
            </button>
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 fontCera">
              <thead className="text-xs text-white uppercase bg-[#332D2D]">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 min-[675px]:px-6 text-center hidden min-[900px]:table-cell"
                  >
                    TİP
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3  min-[675px]:px-6 text-center"
                  >
                    MARKA
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3  min-[675px]:px-6 text-center"
                  >
                    MODEL
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
                  >
                    SERİ NUMARASİ
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="bg-white border-b">
                    <td className="px-3 py-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap hidden min-[900px]:table-cell">
                      {product.type?.name}
                    </td>
                    <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                      {product.brand?.name}
                    </td>
                    <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                      {product.model}
                    </td>
                    <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                      {product.serialNumber}
                    </td>
                    <td className="px-1 py-3 min-[550px]:px-3min-[675px]:px-6">
                      <Link to={`/product/${product._id}`}>
                        <FaEdit />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default Products;
