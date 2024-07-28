import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";
import { useState } from "react";

const ProductsHistory = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const [brandQuery, setBrandQuery] = useState("");
  const [modelQuery, setModelQuery] = useState("");
  const [serialNumberQuery, setSerialNumberQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");

  const filteredProducts = products?.filter((product) => {
    const typeName = product.type?.name.toLowerCase() || "";
    const brandName = product.brand?.name.toLowerCase() || "";
    const modelName = product.model.toString().toLowerCase() || "";
    const serialNumber = product.serialNumber.toString() || "";

    const lowerCaseTypeQuery = typeQuery.toLowerCase();
    const lowerCaseBrandQuery = brandQuery.toLowerCase();
    const lowerCaseModelQuery = modelQuery.toString().toLowerCase();
    const lowerCaseSerialNumberQuery = serialNumberQuery.toString();

    return (
      typeName.includes(lowerCaseTypeQuery) &&
      brandName.includes(lowerCaseBrandQuery) &&
      modelName.includes(lowerCaseModelQuery) &&
      serialNumber.includes(lowerCaseSerialNumberQuery)
    );
  });

  console.log(products);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message negative={true} message={error} />
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
          <div className="flex flex-row items-center justify-center gap-10 mb-8">
            <input
              type="text"
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Envanter Tipi..."
              value={typeQuery}
              onChange={(e) => setTypeQuery(e.target.value)}
            />
            <input
              type="text"
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Envanter Markasi..."
              value={brandQuery}
              onChange={(e) => setBrandQuery(e.target.value)}
            />
            <input
              type="text"
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Envanter Modeli..."
              value={modelQuery}
              onChange={(e) => setModelQuery(e.target.value)}
            />
            <input
              type="text"
              className="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder="Envanter Seri Numarasi..."
              value={serialNumberQuery}
              onChange={(e) => setSerialNumberQuery(e.target.value)}
            />
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 fontCera">
              <thead className="text-xs text-white uppercase bg-[#332D2D]">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 min-[675px]:px-6 text-center hidden min-[900px]:table-cell"
                  >
                    PERSONEL SİCİL NO
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 min-[675px]:px-6 text-center hidden min-[900px]:table-cell"
                  >
                    PERSONEL ADI
                  </th>
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
                  >
                    ALIŞ TARİHİ
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
                  >
                    DÖNÜŞ TARİHİ
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) =>
                  product.takeInf?.map((history) => (
                    <tr key={history._id} className="bg-white border-b">
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                        {history.userPersonel?.registrationNumber || "-"}
                      </td>
                      <td className="px-3 py-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap hidden min-[900px]:table-cell">
                        {history.userPersonel?.name}{" "}
                        {history.userPersonel?.surname}
                      </td>
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                        {product.type?.name || "-"}
                      </td>
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                        {product.brand?.name || "-"}
                      </td>
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                        {product.model || "-"}
                      </td>
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                        {product.serialNumber || "-"}
                      </td>
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                        {history.takenProductDate?.substring(0, 10) || "-"}
                      </td>
                      <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                        {history.returnProductDate?.substring(0, 10) || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductsHistory;
