import SyncLoader from "react-spinners/SyncLoader";

const Loader = () => {
  return (
    <SyncLoader
      className="my-10 w-[130px] mx-auto "
      color="#000"
      size={26}
      margin={8}
    />
  );
};

export default Loader;
