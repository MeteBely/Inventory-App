import { useParams, Link } from "react-router-dom";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";
import { useGetUserDetailsQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";
import Message from "./Message.jsx";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

const UserDebits = () => {
  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [isOpenRemoveProduct, setIsOpenRemoveProduct] = useState(false);

  function closeOpenAddProduct() {
    setIsOpenAddProduct(false);
  }

  function closeOpenRemoveProduct() {
    setIsOpenRemoveProduct(false);
  }

  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const addProductToPersonHandler = () => {
    setIsOpenAddProduct(true);
  };

  const removeProductFromPersonHandler = () => {
    setIsOpenRemoveProduct(true);
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
            open={isOpenAddProduct}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closeOpenAddProduct}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    Payment successful
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-black/50">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={closeOpenAddProduct}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
          <Dialog
            open={isOpenRemoveProduct}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={closeOpenRemoveProduct}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    Payment successful
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={closeOpenRemoveProduct}
                    >
                      Got it, thanks!
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
                      <FaEdit onClick={removeProductFromPersonHandler} />
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
