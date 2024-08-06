import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductDetailsMutation,
} from "../slices/productsApiSlice";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import CustomInput from "./form-components/CustomInput.jsx";
import { productSchema } from "../schemas/index.js";
import CustomRadio from "./form-components/CustomRadio.jsx";

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

  const onSubmit = async (values, actions) => {
    try {
      const updatedProduct = {
        productId,
        type:
          values.type.charAt(0).toUpperCase() +
          values.type.slice(1).toLowerCase(),
        dateOfEntry: values.dateOfEntry,
        brand:
          values.brand.charAt(0).toUpperCase() +
          values.brand.slice(1).toLowerCase(),
        model: values.model,
        serialNumber: values.serialNumber,
        status: values.status,
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
          <div className="pl-4 pt-12 mb-4">
            <Link
              className="text-[14px] w-auto px-10 py-2 rounded-sm tracking-widest bg-black hover:bg-[#333] text-[#fff] mt-4"
              to="/products"
            >
              Go Back
            </Link>
          </div>
          <div>
            <h1 className="text-[#303236] text-[30px] text-center mb-[6px] font-semibold">
              Zimmet Bilgileri
            </h1>
            <Formik
              initialValues={{
                type: product.type?.name || "",
                dateOfEntry: product.dateOfEntry
                  ? new Date(product.dateOfEntry).toISOString().substring(0, 10)
                  : null,
                brand: product.brand?.name || "",
                model: product.model || "",
                serialNumber: product.serialNumber || "",
                status: product.status || "",
              }}
              onSubmit={onSubmit}
              validationSchema={productSchema}
            >
              {({ values }) => (
                <Form className="w-[360px] m-auto border border-[#E5E7EB] rounded-md px-2 py-4 bg-white">
                  <CustomInput label="Tip" name="type" />
                  <br />
                  <CustomInput
                    disabled
                    type="date"
                    label="Envantere giriş tarihi"
                    name="dateOfEntry"
                  />
                  <br />
                  <CustomInput label="Marka" name="brand" />
                  <br />
                  <CustomInput label="Model" name="model" />
                  <br />
                  <CustomInput label="Seri Numarasi" name="serialNumber" />
                  <br />
                  <CustomRadio
                    disabled
                    label="Statü"
                    name="status"
                    options={[
                      { key: "Depoda", value: "Depoda" },
                      { key: "Personelde", value: "Personelde" },
                      { key: "Ofiste", value: "Ofiste" },
                    ]}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-lg font-semibold w-full h-[47.88px] tracking-wider bg-black hover:bg-[#333] text-[#fff] mt-4"
                  >
                    ONAYLA
                  </button>
                  {loadingUpdate && <Loader />}
                </Form>
              )}
            </Formik>
          </div>
        </section>
      )}
    </>
  );
};

export default Product;
