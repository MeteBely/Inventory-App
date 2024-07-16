import { products } from "../product";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
//<thead className="text-xs text-gray-700 text-white uppercase bg-gray-50">

const Products = () => {
  return (
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
        <button>
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
        />
        <button
          type="button"
          className="text-white mt-[6px] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
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
            {products.map((product) => (
              <tr key={product._id} className="bg-white border-b">
                <td className="px-3 py-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap hidden min-[900px]:table-cell">
                  {product.type}
                </td>
                <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                  {product.brand}
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
  );
};

export default Products;
