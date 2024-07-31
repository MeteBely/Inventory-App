import { useParams, Link } from "react-router-dom";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";
import { useGetUserDetailsQuery } from "../slices/usersApiSlice";
import {
  useGetProductsQuery,
  useUpdateProductAndUserMutation,
} from "../slices/productsApiSlice.js";
import Loader from "./Loader";
import Message from "./Message.jsx";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserDebits = () => {
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
  } = useGetUserDetailsQuery(userId);

  const {
    data: products,
    isLoadingProducts,
    errorProduct,
    refetch: refetchProducts,
  } = useGetProductsQuery();

  const [updateProductAndUser, { isLoading: loadingUpdate }] =
    useUpdateProductAndUserMutation();

  const [availableCurrentProducts, setAvailableCurrentProducts] = useState([]);

  const [selectedAvailableProductId, setSelectedAvailableProductId] =
    useState("");

  useEffect(() => {
    if (!isLoadingProducts && products) {
      let availableProducts = products?.filter((product) => {
        return product.status === "Depoda";
      });
      setAvailableCurrentProducts(availableProducts);
      setSelectedAvailableProductId(availableProducts[0]?._id || "");
    }
  }, [isLoadingProducts, products, refetchProducts, refetchUser]);

  const [selectedAvailableProductDate, setSelectedAvailableProductDate] =
    useState("");
  const [selectedRemoveProductDate, setSelectedRemoveProductDate] =
    useState("");
  const [selectedRemoveProductId, setSelectedRemoveProductId] = useState("");
  const [addProductPopup, setAddProductPopup] = useState(false);
  const [removeProductPopup, setRemoveProductPopup] = useState(false);

  const closeAddProductPopup = async () => {
    try {
      const updatedProductAndUser = {
        productId: selectedAvailableProductId,
        action: "add",
        userId,
        takenProductDate: selectedAvailableProductDate,
      };
      await updateProductAndUser(updatedProductAndUser);
      refetchProducts();
      refetchUser();
      toast.success("Zimmet başariyla personele eklendi!");
    } catch (err) {
      toast.error("Zimmet personele eklenirken hata ile karsilasildi!");
      console.log(err);
    }
    setAddProductPopup(false);
  };

  const closeRemoveProductPopup = async () => {
    try {
      const updatedProductAndUser = {
        productId: selectedRemoveProductId,
        action: "remove",
        userId,
        returnProductDate: selectedRemoveProductDate,
      };
      await updateProductAndUser(updatedProductAndUser);
      refetchProducts();
      refetchUser();
      toast.success("Zimmet başariyla personelden çikarildi!");
    } catch (err) {
      toast.error("Zimmet personelden cikartilirken hata ile karsilasildi!");
      console.log(err);
    }
    setRemoveProductPopup(false);
  };

  const addProductToPersonHandler = () => {
    setAddProductPopup(true);
  };

  const removeProductFromPersonHandler = (removableProductId) => {
    setRemoveProductPopup(true);
    setSelectedRemoveProductId(removableProductId?._id);
  };

  const closePopup = () => {
    setAddProductPopup(false);
    setRemoveProductPopup(false);
  };

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
              to="/usersDebits"
            >
              Go Back
            </Link>
          </div>
          <div className="flex flex-row items-center justify-around pt-8 mb-4">
            <h2 className="text-5xl font-bold tracking-wider">
              Personel Zimmetleri: {user.name} {user.surname}
            </h2>
            <button onClick={(e) => addProductToPersonHandler(e)}>
              <FaRegPlusSquare size={60} />
            </button>
          </div>
          <Dialog
            open={addProductPopup}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closePopup}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border border-black"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    Add Product to User
                  </DialogTitle>
                  <div className="mt-2 text-sm/6 text-black/50">
                    <select
                      className="mr-4 h-[28px] border-b"
                      name="availableProducts"
                      id="availableProducts"
                      value={selectedAvailableProductId}
                      onChange={(e) =>
                        setSelectedAvailableProductId(e.target.value)
                      }
                    >
                      {availableCurrentProducts &&
                        availableCurrentProducts.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.brand?.name} {product.type?.name}
                          </option>
                        ))}
                    </select>
                    <input
                      className="border-b"
                      type="date"
                      value={selectedAvailableProductDate}
                      onChange={(e) =>
                        setSelectedAvailableProductDate(e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={closeAddProductPopup}
                    >
                      Onayla
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
          <Dialog
            open={removeProductPopup}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closePopup}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border border-black"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    Remove Product from User
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-black/50">
                    <input
                      className="border-b"
                      type="date"
                      value={selectedRemoveProductDate}
                      onChange={(e) =>
                        setSelectedRemoveProductDate(e.target.value)
                      }
                    />
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 text-white font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={closeRemoveProductPopup}
                    >
                      Onayla
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 fontCera">
              <thead className="text-xs text-white uppercase bg-[#332D2D]">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 min-[675px]:px-6 text-center hidden min-[900px]:table-cell"
                  >
                    Tip
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3  min-[675px]:px-6 text-center"
                  >
                    Marka
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {user.inventory?.map((product) => (
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
                    <td className="px-1 py-3 min-[550px]:px-3min-[675px]:px-6">
                      <FaEdit
                        className="cursor-pointer"
                        onClick={() => removeProductFromPersonHandler(product)}
                      />
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

export default UserDebits;
