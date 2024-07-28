import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../Message.jsx";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {userInfo && (userInfo.role == "admin" || userInfo.role == "IM") ? (
        <Outlet />
      ) : (
        <>
          <div className="pl-12 pt-12 mb-12">
            <Link
              className="text-[14px] w-auto px-10 py-2 rounded-sm fontRoboto tracking-widest bg-[#F26444] hover:bg-[#333] text-[#fff] fontCera mt-4"
              to="/"
            >
              Go Back
            </Link>
          </div>
          <Message
            negative={true}
            message="You are not authorized for an admin or IM!"
          />
        </>
      )}
    </>
  );
};

export default AdminRoute;